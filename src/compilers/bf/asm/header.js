module.exports = `
.data
  .offset size 1
  .memory size 30000

.text
  .global entry:

inc_mem_ptr:
  ldv16 A, .offset
  ldr B, A
  ldv16 A, .memory
  add A, B            ; A = memory + offset
  ldr B, A            ; B = value at [memory + offset]
  inc B               ; increment B
  ldp A, B            ; store the result back in memory
  ret

dec_mem_ptr:
  ldv16 A, .offset
  ldr B, A
  ldv16 A, .memory
  add A, B            ; A = memory + offset
  ldr B, A            ; B = value at [memory + offset]
  dec B               ; decrement B
  ldp A, B            ; store the result back in memory
  ret

inc_ptr:
  ldv16 A, .offset
  ldr B, A            ; B = value at [offset]
  inc B               ; increment B
  ldp A, B            ; store the result back in memory
  ret

dec_ptr:
  ldv16 A, .offset
  ldr B, A            ; B = value at [offset]
  dec B               ; decrement B
  ldp A, B            ; store the result back in memory
  ret

input:
  ldv A, 1            ; load A with the the stdin call code
  sys                 ; get a character of stdin, place into B
  mov A, B            ; swap A and B
  ldv B, 1            ; load 1 into B for comparison
  ldv C, input:       ; load the input address into C
  jlt B, C            ; if A < 1(B), loop back to input
  psh A               ; push the character into stack
  ldv16 A, .offset    ; Same procedure as inc_mem_ptr, except just set the value directly
  ldr B, A
  ldv16 A, .memory
  add A, B            ; A = memory + offset
  pop B               ; Get back the character into B
  ldp A, B            ; store the result back in memory
  ret

output:
  ldv16 A, .offset
  ldr B, A
  ldv16 A, .memory
  add A, B            ; A = memory + offset
  ldr B, A            ; B = value at [memory + offset]
  ldv A, 0            ; Load A with stdout call code
  ldv C, 3            ; Interpret as char code mode for stdout
  sys
  ret

entry:
`;