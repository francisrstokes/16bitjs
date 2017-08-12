.data
  .equals string ' * 1 = '
  .counter 7
  .result 7
  .times string ' * '
.text
  .global main:


factorial:
    lda A, .counter
    psh A

    ; Print counter
    mov B, A
    mvi A, 0
    mvi C, 0
    sys

    pop A
    mvi B, 3
    mvi D, done:
    jlt A, B, D

    psh a
    psh b
    psh c

    mvi a, 0
    mvi b, .times
    mvi c, 4
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

    mvi A, factorial:
    jmr A

    done:
      psh a
      psh b
      psh c
      mvi a, 0
      mvi b, .equals
      mvi c, 4
      sys
      pop c
      pop b
      pop a
      ret

main:
  mvi A, factorial:
  cal A

  ; Print result
  mvi A, 0
  mvi D, .result
  ldr B, D
  mvi C, 0
  sys

  ; Print newline
  mvi B, 10
  mvi C, 3
  sys
  hlt