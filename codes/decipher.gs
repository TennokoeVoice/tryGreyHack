//decipher add recursive mode

if params.len < 1 or params[0] == "-h" or params[0] == "--help" or (params.len == 2 and params[0] != "-R") then exit("<b>Usage: decipher [encrypted file] [opt:-R]</b>")

cryptools = include_lib("/lib/crypto.so")
if not cryptools then
	cryptools = include_lib(current_path + "/crypto.so")
end if
if not cryptools then exit("Error: Missing crypto library")

GetPassword = function(userPass)
	if userPass.len != 2 then exit("decipher: " + file.path + " wrong syntax")
	password = cryptools.decipher(userPass[1])
	return password
end function

origFile = params[0]
if params and params[params.len - 1].indexOf("-") == null then
	origFile = params[params.len - 1]
end if
file = get_shell.host_computer.File(origFile)
if not file then exit("decipher: can't find " + origFile)
if not file.has_permission("r") then exit("can't read file. Permission denied")
if file.get_content.len == 0 then exit("decipher: no users found")

lines = file.get_content.split("\n")
password = null

if params.len == 2 then
	for line in lines
		userPass = line.split(":")
		if line.len == 1 then exit()
		print("Selected user: " + userPass[0] + "\nDeciphering...")
		password = GetPassword(userPass)
		if not password then
			print("Can't find password :(")
			continue
		end if
		print("password found! => " + password)
	end for
	exit()
end if

if lines.len == 1 then
	userPass = lines[0].split(":")
	password = GetPassword(userPass)
else
	print("Multiple users found.")
	numLine = 1
	for line in lines
		if line.len > 0 then
			print(numLine + ": " + line)
			numLine = numLine + 1
		end if
	end for
	option = ""
	inputOk = false
	while( not inputOk )
		option = user_input("Select user: ").to_int
		if typeof(option) != "number" or (option < 1 or option > lines.len) then
			print("Invalid input. Type a valid number")
		else
			inputOk = true
		end if
	end while

	userPass = lines[option - 1].split(":")
	print("Selected user: " + userPass[0] + "\nDeciphering...")
	password = GetPassword(userPass)
end if

if not password then exit("Can't find password :(")
print("password found! => " + password)