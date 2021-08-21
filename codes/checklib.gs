//lib version check

if params.len != 1 or params[0] == "-h" or params[0] == "--help" then exit("<b>Usage: checklib [lib file]<b>")

meta = include_lib("/lib/metaxploit.so")
if not meta then
	meta = include_lib(current_path + "/metaxploit.so")
end if
if not meta then exit("Error: Can't find metaxploit library in the /lib path or the current folder")

target = params[0]
lib = meta.load(target)
if not lib then exit("Error: missing " + target)
print(lib.version)