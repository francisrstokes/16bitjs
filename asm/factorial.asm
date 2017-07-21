.data
  .equals string ' * 1 = '
  .counter 8
  .result 8
  .times string ' * '
.text
  .global main:


factorial:
    lda A, .counter
    psh A

    ; Print counter
    mov B, A
    ldv A, 0
    ldv C, 0
    sys

    pop A
    ldv B, 3
    ldv D, done:
    jlt B, D

    psh a
    psh b
    psh c

    ldv a, 0
    ldv b, .times
    ldv c, 4
    sys

    pop c
    pop b
    pop a

    mov B, A
    dec B

    lda C, .result
    mul C, B

    ldm C, .result
    ldm B, .counter

    ldv A, factorial:
    jmr A

    done:
      psh a
      psh b
      psh c
      ldv a, 0
      ldv b, .equals
      ldv c, 4
      sys
      pop c
      pop b
      pop a
      ret

main:
  ldv A, factorial:
  cal A

  ; Print result
  ldv A, 0
  ldv D, .result
  ldr B, D
  ldv C, 0
  sys

  ; Print newline
  ldv B, 10
  ldv C, 3
  sys
  hlt