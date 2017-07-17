.data
  .test 100
  .test2 string "abcdef"
  .test3 99
  .test4 size 10
  .test5 0x55

.text
  .global main:

main:
  LDV A, .test
  LDA B, A
  LDV A, 0
  LDV C, 0
  SYS
  HLT