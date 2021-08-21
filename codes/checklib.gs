//lib version check

if params.len < 1 or params[0] == "-h" or params[0] == "--help" or (params.len == 2 and params[0] != "-R") then exit("<b>Usage: checklib [opt:-R] [lib file]<b>")

meta = include_lib("/lib/metaxploit.so")
if not meta then
	meta = include_lib(current_path + "/metaxploit.so")
end if
if not meta then exit("Error: Can't find metaxploit library in the /lib path or the current folder")

if params.len == 2 then
	libs = get_shell.host_computer.File(params[1]).get_files
	for i in libs
		lib = meta.load(params[1] + "/" + i.name)
		print(i.name + " : " + lib.version)
	end for
	exit()
end if

target = params[0]
lib = meta.load(target)
if not lib then exit("Error: missing " + target)
libname = params[0].split("/")
print(libname[-1] + " : " + lib.version)