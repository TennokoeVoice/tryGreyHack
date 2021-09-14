// instant Decypher

if params.len != 1 or params[0] == "-h" or params[0] == "--help" then exit("<b>Usage: " + program_path.split("/")[-1] + " [user:encrypted string]</b>")

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

line = params[0]
password = null

userPass = line.split(":")
if userPass.len <= 1 then exit()
print("Deciphering...")
password = GetPassword(userPass)
if not password then
	print("Can't find password :(")
end if
print("password found! => " + password)
exit()