// Load domain configurations from JSON files
function getDomainsList(filesPath) {
    var result = [];
    var files = glob.apply(null, [filesPath, true, ".json"]);

    for (var i = 0; i < files.length; i++) {
        // Skip template file if it exists
        var fileName = files[i].split("/").pop();
        if (fileName === "TEMPLATE.json") continue;

        var name = fileName.replace(/\.json$/, "");
        try {
            result.push({ name: name, data: require(files[i]) });
        } catch (e) {
            console.error("Error loading file: " + files[i] + " - " + e.message);
        }
    }

    return result;
}

var allDomains = getDomainsList("./domains");
var commit = [];

// Process each subdomain configuration
for (var i = 0; i < allDomains.length; i++) {
    var subdomainName = allDomains[i].name;
    var domainData = allDomains[i].data;
    var proxyState = domainData.proxied ? { cloudflare_proxy: "on" } : { cloudflare_proxy: "off" };

    // Handle A records (IPv4)
    if (domainData.target && domainData.target.A) {
        for (var a = 0; a < domainData.target.A.value.length; a++) {
            commit.push(A(domainData.target.A.name, IP(domainData.target.A.value[a]), proxyState));
        }
    }

    // Handle AAAA records (IPv6)
    if (domainData.target && domainData.target.AAAA) {
        for (var aaaa = 0; aaaa < domainData.target.AAAA.value.length; aaaa++) {
            commit.push(AAAA(domainData.target.AAAA.name, domainData.target.AAAA.value[aaaa], proxyState));
        }
    }

    // Handle CNAME records
    if (domainData.target && domainData.target.CNAME) {
        // CNAME can't be at root, use ALIAS instead
        if (domainData.target.CNAME.name === "@") {
            commit.push(ALIAS("@", domainData.target.CNAME.value + ".", proxyState));
        } else {
            commit.push(CNAME(domainData.target.CNAME.name, domainData.target.CNAME.value + ".", proxyState));
        }
    }

    // Handle NS records
    if (domainData.target && domainData.target.NS) {
        for (var ns = 0; ns < domainData.target.NS.value.length; ns++) {
            commit.push(NS(domainData.target.NS.name, domainData.target.NS.value[ns] + "."));
        }
    }

    // Handle TXT records
    if (domainData.target && domainData.target.TXT) {
        if (Array.isArray(domainData.target.TXT)) {
            // Handle multiple TXT records
            for (var txt = 0; txt < domainData.target.TXT.length; txt++) {
                var txtRecord = domainData.target.TXT[txt];
                // Make sure TXT values are properly quoted
                var txtValue = typeof txtRecord.value === 'string' ? '"' + txtRecord.value + '"' : txtRecord.value;
                commit.push(TXT(txtRecord.name, txtValue));
            }
        } else {
            // Handle single TXT record
            var name = domainData.target.TXT.name;
            // Make sure TXT value is properly quoted
            var txtValue = typeof domainData.target.TXT.value === 'string' ?
                '"' + domainData.target.TXT.value + '"' : domainData.target.TXT.value;

            // If name is @ or subdomain itself, use simple name
            if (name === "@") {
                commit.push(TXT(subdomainName, txtValue));
            } else {
                // Otherwise, prepend to subdomain
                commit.push(TXT(name + "." + subdomainName, txtValue));
            }
        }
    }
}

// Ignore any MX records for wildcard subdomains
commit.push(IGNORE("*", "MX", "*"));

// Apply all DNS records to the domain
D("starcity.eu.org", NewRegistrar("none"), DnsProvider(NewDnsProvider("cloudflare")), commit);