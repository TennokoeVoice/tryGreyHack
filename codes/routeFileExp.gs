//kernel_router routed lan fileExplore

if params.len != 1 or params[0] == "-h" or params[0] == "--help" then exit("<b>Usage: "+program_path.split("/")[-1]+" [ip_address]</b>")
metaxploit = include_lib("/lib/metaxploit.so")
if not metaxploit then
	metaxploit = include_lib(current_path + "/metaxploit.so")
end if
if not metaxploit then exit("Error: Can't find metaxploit library in the /lib path or the current folder")
address = params[0]
net_session = metaxploit.net_use( address )
if not net_session then exit("Error: can't connect to net session")
libKernel = net_session.dump_lib
libName = "kernel_router.so"
print("Searching " + libName +" ...")
if not libKernel then exit("Error: " + libName + " not found.")
lanIp = user_input("Enter a LAN address: ")
result = libKernel.overflow("0x267C4BBE", "tor3", lanIp)

typeObject = typeof(result)
if(typeObject != "computer") then exit("Error: expected computer, obtained " + typeObject)

GetFile = function()
	folders = file.get_folders
	files = file.get_files
	mixed = [folders, files]
	for i in mixed
		for f in i
			print(f.name)
		end for
	end for
end function

flag = 1

while flag == 1
	targetPath = user_input("Enter [ls] or [cat] + /path > ")
	if targetPath == "exit" then exit()
	cmd = targetPath.split(" ")
	if cmd.len != 2 then continue
	file = result.File(cmd[1])
	print(cmd[1])
	if not file then continue
	if not file.has_permission("r") then continue
	if cmd[0] == "ls" then
		GetFile
	else if cmd[0] == "cat" then
		print(file.get_content)
	else
		continue
	end if
end while