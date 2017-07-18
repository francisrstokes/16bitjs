  .data
.l1 string '             .-.  .-.\n             |  \/  |\n            /,   ,_  `'-.\n          .-|\   /`\     '.\n'
.l2 string '        .'  0/   | 0\  \_  `".\n     .-'  _,/    '--'.'|#''---'\n      `--'  |       /   \#\n'
.l3 string '            |      /     \#\n            \     :|\    .\#\n            |' ' //  \   ::\#\n'
.l4 string '            \   /`    \   ':\#\n             `"`       \..   \#\n                        \::.  \#\n'
.l5 string '                        \::.  \#\n'
  .text
.global main:

main:
  ldv a, 0
  ldv c, 4
  ldv b, .l1
  sys
  ldv b, .l2
  sys
  ldv b, .l3
  sys
  ldv b, .l4
  sys
  ldv b, .l5
  sys
  hlt
