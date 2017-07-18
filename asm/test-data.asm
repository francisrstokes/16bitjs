.data
  .test string "abcdef"
  .test2 string "ghijklmnopqrstuvwxyz"
  .test3 string "\n"
  .test4 size 6

.text
  .global main:

main:
  LDV A, 0
  LDV B, .test
  LDV C, 4
  SYS
  LDV B, .test2
  SYS
  LDV B, test3
  SYS
  HLT