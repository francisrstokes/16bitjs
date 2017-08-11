.data
  .number -10
.text
  .global main:

main:
  lda b, .number
  mvi a, 0
  mvi c, 0
  sys
  hlt