//show all vulnerability from lib

if params.len != 1 or params[0] == "-h" or params[0] == "--help" then exit(command_info("scanlib_usage"))

meta = include_lib("/lib/metaxploit.so")
if not meta then
	meta = include_lib(current_path + "/metaxploit.so")
end if
if not meta then exit("Error: Missing metaxploit library")

libFile = get_shell.host_computer.File(params[0])
if not libFile then exit("can't find library: " + params[0])

print("Scanning memory address...")

metaLib = meta.load(libFile.path)
listMem = meta.scan(metaLib)

index = 1

for itemMem in listMem
	print(index +": [" + itemMem + "]")
	index = index + 1
end for

if listMem.len == 0 then exit("Scan completed: No issues detected.")
print("Scan completed: detected issues in " + listMem.len + " memory zones.")

for v in range(listMem.len - 1)
	print("Scanning for vulnerabilities at memory zone: " + listMem[v - 1])
	print(meta.scan_address(metaLib, listMem[v - 1]))
end for