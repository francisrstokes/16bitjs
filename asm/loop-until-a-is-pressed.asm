.data
  .waiting string "Waiting for A key...\n"
.text
  .global main:

get_input:
  psh A
  psh C
  ldv A, 1 ; syscall for stdin
  ldv C, 0 ; mode for output
  sys      ; initiate system call
  pop C
  pop A
  ret

main:
  ldv A, 0
  ldv b, .waiting
  ldv c, 4
  sys

  ldv A, 97
  ldv B, 0

  ldv16 C, loop:
  ldv16 D, get_input:

  loop:
    cal D
    jne A, B, C

  hlt