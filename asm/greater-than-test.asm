.data
  .aval 20
  .gestr string 'Greater than or equal to\n'
  .ltstr string 'Less than\n'
.text
.global main:

main:
  ldv c, .aval
  lda a, c
  ldv b, 10
  ldv c, gte:
  jge b, c

  ldv a, lt:
  jmr a

  gte:
    ldv c, .aval
    lda a, c
    dec a
    ldp c, a
    ldv a, gtef:
    cal a
    ldv a, main:
    jmr a
    gtef:
      ldv a, 0
      ldv b, .gestr
      ldv c, 4
      sys
      ret
  lt:
    ldv a, ltf:
    cal a
    ltf:
      ldv a, 0
      ldv b, .ltstr
      ldv c, 4
      sys
      hlt