import os;
from os import system;
from os import path;
import time;

system('cls')

print('=====> Minecraft Bedrock Edition Content Log Watcher <=====')

#LogPath = input('\nSpecify the Logs Folder or File to watch (Keep blank to use Default Folder)\nEnter the Path: ')

# print('\n')
# if not path.exists(LogPath):
# 	print('A Folder or file for debugging was not specified or is invalid. Using default folder:')
# 	LogPath = os.getenv('LOCALAPPDATA') + '\\Packages\\Microsoft.MinecraftUWP_8wekyb3d8bbwe\\LocalState\\logs\\'
# else:
# 	print('Using the specified log '+('File' if path.isfile(LogPath) else 'Folder')+':')

LogPath = os.getenv('LOCALAPPDATA') + '\\Packages\\Microsoft.MinecraftUWP_8wekyb3d8bbwe\\LocalState\\logs\\'
print('Path: '+str(LogPath)+'\n')

def watchfile(filepath, auto = False):
	system('cls')
	if auto:
		print("Only one file was found. Started watching it by default")
	print("Watching file: "+filepath.replace(LogPath, "")+"\n")
	logfile = open(filepath, 'r')
	logfile.seek(0, os.SEEK_END)
	while True:
		line = logfile.readline()
		if line:
			print(line)
		else:
			time.sleep(0.05)

def LoadFile(fpath):
	if path.isdir(fpath):
		FilesInDir = os.listdir(fpath)
		if len(FilesInDir) < 1:
			system('cls')
			print("No Log Files found in the folder, the program is waiting until a file is created.")
			time.sleep(0.1)
			return LoadFile(LogPath)
		if len(FilesInDir) == 1:
			return watchfile(path.join(LogPath, FilesInDir[0]), True)
		print('Specify the Log File to watch:')
		logfiles = []
		index = 0
		for file in FilesInDir:
			if file.endswith(".txt") or file.endswith(".log"):
				logfiles.append({
					'filei': index,
					'filep': path.join(fpath, file)
				})
				index += 1
		for file in logfiles:
			print(str(file['filei']) + ' -> ' + file['filep'].replace(LogPath, ''))
		FileNumber = input('\nSelect a file or press Enter to use the first file from the list:\nType the File number: ') or '0'
		if FileNumber == 'exit':
			print('Exiting program...')
			time.sleep(2)
			return
		for file in logfiles:
			if str(file['filei']) == FileNumber:
				LogFile = file['filep']
				break
		if not 'LogFile' in locals():
			system('cls')
			print('There is no file with that number on the list\n')
			LoadFile(LogPath)
			return
		watchfile(LogFile)
	elif path.isfile(fpath):
		watchfile(LogFile)
	
time.sleep(1)

system('cls')

LoadFile(LogPath)
