// Local Vulnerabilities Test

if params.len < 3 or params[0] == "-h" or params[0] == "--help" then exit("<b>Usage: checkvuln [lib_path] [memoryAddress] [vulnerabilities]</b>")

metaxploit = include_lib("/lib/metaxploit.so")
if not metaxploit then
	metaxploit = include_lib(current_path + "/metaxploit.so")
end if
if not metaxploit then exit("Error: Can't find metaxploit library in the /lib path or the current folder")

metaLib = metaxploit.load(params[0])
result = metaLib.overflow(params[1], params[2])
print(result)