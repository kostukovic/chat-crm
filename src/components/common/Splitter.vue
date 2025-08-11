<script setup lang="ts">
    import { onMounted, onUnmounted } from 'vue'
    const emit = defineEmits<{ (e:'resize', dx:number): void }>()
    let dragging = false, startX = 0
    
    function down(e: MouseEvent){ dragging = true; startX = e.clientX; document.body.style.userSelect='none' }
    function move(e: MouseEvent){ if(!dragging) return; emit('resize', e.clientX - startX); startX = e.clientX }
    function up(){ dragging = false; document.body.style.userSelect=''; }
    
    onMounted(()=>{
      window.addEventListener('mousemove', move)
      window.addEventListener('mouseup', up)
    })
    
    onUnmounted(()=>{
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseup', up)
    })
    </script>
    
    <template>
      <div style="width:6px;cursor:col-resize;background:#1b2431" @mousedown="down"></div>
    </template>