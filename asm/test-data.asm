.data
  .test string "abcdef"
  .test2 string "ghijklmnopqrstuvwxyz"
  .test3 string "\n"
  .test4 size 6

.text
  .global main:

main:
  ldv A, 0
  ldv B, .test
  ldv C, 4
  sys
  ldv B, .test2
  sys
  ldv B, test3
  sys
  hlt