#!/usr/bin/python2


# Copyright (c) 2012 The Chromium Authors. All rights reserved.
# Use of this source code is governed by a BSD-style license that can be
# found in the LICENSE file.

# A simple native messaging host. Shows a Tkinter dialog with incoming messages
# that also allows to send message back to the webapp.
##!/usr/bin/env python2
import struct
import sys
import json
import subprocess
import os 

dir_path = os.path.dirname(os.path.realpath(__file__))

# from pwn import *
# context.log_level = 'error'
# Helper function that sends a message to the webapp.
def send_message(message):
   # Write message size.
  sys.stdout.write(struct.pack('I', len(message)))
  # Write the message itself.
  sys.stdout.write(message)
  sys.stdout.flush()

def log(msg):
  pass
  # if type(msg) is dict:
  #   msg = json.dumps(msg)
  # sys.stderr.write(msg.encode('utf8'))
  # sys.stderr.flush()

def call_js(param):
    sh = subprocess.Popen([dir_path+'/main.js', param['url'], param['selector']], stdout=subprocess.PIPE, stdin=subprocess.PIPE)
    # data, _ = sh.communicate(input='\n'.join(map(lambda x: x.encode('utf8'), options)))
    return sh.stdout.read().strip()

# def call_rofi(param):
#   options = param['opts']
#   rofi_opts = ['rofi', '-dmenu']
#   if 'rofi-opts' in param:
#     rofi_opts.extend(param['rofi-opts'])

#   sh = subprocess.Popen(rofi_opts, stdout=subprocess.PIPE, stdin=subprocess.PIPE)
#   # data, _ = sh.communicate(input='\n'.join(map(lambda x: x.encode('utf8'), options)))
#   sh.stdin.write('\n'.join(map(lambda x: x.encode('utf8'), options)))
#   sh.stdin.flush()
#   sh.stdin.close()



#   return sh.stdout.read().strip()
#   # sh = process(rofi_opts)
#   # for each in options:
#   #   sh.sendline(each.encode('utf8'))
#   # sh.shutdown('send')
#   # return sh.recvall().strip()



def main():
  log('launched')
  while True:
    # Read the message length (first 4 bytes).
    data_length_bytes = sys.stdin.read(4)

    if len(data_length_bytes) == 0:
      break

    
    data_length = struct.unpack('i', data_length_bytes)[0]

    # Read the data (JSON object) of the message.
    data = sys.stdin.read(data_length).decode('utf-8')
    log(data)
    data = json.loads(data)
    log(data)
    
    cmd = data['cmd']
    param = data['param']
    if cmd == 'js':
      output = {
        'cmd': 'js',
        'result': call_js(param)
      }
    else:
      output = {
        'result': 'unknow command: {}'.foramt(cmd)
      }
    send_message(json.dumps(output))


  sys.exit(0)


if __name__ == '__main__':
  main()
