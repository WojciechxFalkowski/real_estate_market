<template>
  <div v-if="editor" class="editor-buttons-wrapper">
    <button
      @click="editor.chain().focus().toggleBold().run()"
      :disabled="!editor.can().chain().focus().toggleBold().run()"
      :class="{ 'is-active': editor.isActive('bold') }"
    >
      bold
    </button>
    <button
      @click="editor.chain().focus().toggleItalic().run()"
      :disabled="!editor.can().chain().focus().toggleItalic().run()"
      :class="{ 'is-active': editor.isActive('italic') }"
    >
      italic
    </button>
    <button
      @click="editor.chain().focus().toggleUnderline().run()"
      :class="{ 'is-active': editor.isActive('underline') }"
    >
      toggleUnderline
    </button>
    <button
      @click="editor.chain().focus().setParagraph().run()"
      :class="{ 'is-active': editor.isActive('paragraph') }"
    >
      paragraph
    </button>
    <button
      @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
      :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }"
    >
      h1
    </button>
    <button
      @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
      :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }"
    >
      h2
    </button>
    <button
      @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
      :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }"
    >
      h3
    </button>
    <button
      @click="editor.chain().focus().toggleHeading({ level: 4 }).run()"
      :class="{ 'is-active': editor.isActive('heading', { level: 4 }) }"
    >
      h4
    </button>
    <button
      @click="editor.chain().focus().toggleHeading({ level: 5 }).run()"
      :class="{ 'is-active': editor.isActive('heading', { level: 5 }) }"
    >
      h5
    </button>
    <button
      @click="editor.chain().focus().toggleHeading({ level: 6 }).run()"
      :class="{ 'is-active': editor.isActive('heading', { level: 6 }) }"
    >
      h6
    </button>
    <button
      @click="editor.chain().focus().toggleBulletList().run()"
      :class="{ 'is-active': editor.isActive('bulletList') }"
    >
      bullet list
    </button>
    <button
      @click="editor.chain().focus().toggleOrderedList().run()"
      :class="{ 'is-active': editor.isActive('orderedList') }"
    >
      ordered list
    </button>
    <button
      @click="editor.chain().focus().toggleBlockquote().run()"
      :class="{ 'is-active': editor.isActive('blockquote') }"
    >
      blockquote
    </button>
    <button @click="editor.chain().focus().setHorizontalRule().run()">
      horizontal rule
    </button>
    <button @click="editor.chain().focus().setHardBreak().run()">
      hard break
    </button>
    <button
      @click="editor.chain().focus().undo().run()"
      :disabled="!editor.can().chain().focus().undo().run()"
    >
      undo
    </button>
    <button
      @click="editor.chain().focus().redo().run()"
      :disabled="!editor.can().chain().focus().redo().run()"
    >
      redo
    </button>
  </div>
  <editor-content :editor="editor" class="my-4 bg-white" />

  <!-- <button @click="saveData">save</button> -->
  <Button
    @click="saveData"
    class="block m-auto"
    type="submit"
    :componentType="ComponentType.Button"
    :theme="Theme.Primary"
    :isLoading="isLoading"
  >
    Zapisz
  </Button>
</template>

<script setup lang="ts">
import { useEditor, Editor, EditorContent } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import { Theme, ComponentType } from "@/components/Button/Button.props";
import Underline from "@tiptap/extension-underline";
defineProps({
  modelValue: {
    type: String,
    default: "",
  },
});

const emit = defineEmits<{
  change: [id: number]; // named tuple syntax
  update: [value: string];
}>();
const isLoading = ref(false);
const editor = ref<Editor>();
onMounted(() => {
  editor.value = new Editor({
    extensions: [StarterKit, Underline],
    content: `
<p><strong>LUKSUSOWY APARTAMENT W UNIQUE TOWER WYKOŃCZONY POD KLUCZ</strong></p><p><strong><em>Trzy sypialnie | W pełni umeblowany | Wysokie piętro | Luksusowe wykończenie | Wysoki standard | Klimatyzacja</em></strong><br><br><strong>ROZKŁAD I STANDARD:</strong></p><p>Apartament składa się z:<br>* Przestronnego salonu z otwartą kuchnią i jadalnią,<br>* trzech sypialni,<br>* trzech łazienek,<br>* reprezentacyjnego holu z garderobą.<br></p><p>Apartament zaprojektowany przez architekta, jego głównymi zaletami jest wysoka jakość wykończenia oraz uniwersalny styl. Ponadczasowy design, idealnie skomponowane materiały, kolorystyka.&nbsp;Wyposażony został w klimatyzację, w pełni umeblowany i wyposażony w zastawę stołową, pościel, ręczniki, gotowy do wprowadzenia od zaraz.<br></p><p>Wykończenie z najwyższą dbałością o jakość.<br></p><p><strong>INWESTYCJA:</strong><br></p><p>Unique Tower to kompleks apartamentowców, zlokalizowany na bliskiej Woli, przy ul. Grzybowskiej 51. W budynku o 29 kondygnacjach poza apartamentami znajduje się szereg udogodnień- na parterze budynku mieści się przestrzeń usługowo-handlowa, najwyższej klasy restauracja, strefa SPA i fitness oraz kompleks konferencyjno-biznesowy.</p><p>Designerskie wnętrza części wspólnych i 5-gwiazdkowy standard apartamentów to gwarancja komfortu, prestiżu oraz najwyższej jakości.<br></p><p><strong>LOKALIZACJA:</strong></p><p>Ulica Grzybowska położona jest w samym sercu Warszawy.<br>Pieszy dystans do wszystkich środków komunikacji miejskiej, w tym stacji przesiadkowej metra M1/M2 Świętokrzyska.</p><p>Centralna lokalizacja wraz z doskonałą infrastrukturą handlowo – usługową dają duży komfort mieszkania, tuż obok znajdują się takie punkty usługowe jak: apteka, sklepy spożywcze, salon fryzjerko- kosmetyczny, banki. W pobliżu także: kina, teatry, Ogród Saski, sklepy, piekarnie, kawiarnie, biurowce, pięciogwiazdkowe hotele.</p><p>Dwa kroki do Dworca Centralnego i CH Złote Tarasy. Okolica pełna najbardziej znanych i cenionych w Warszawie restauracji.<br></p><p><strong>INFORMACJE DODATKOWE:</strong></p><p>* Wymaga jest kaucja.<br>* Miejsce parkingowe płatne dodatkowo oraz zaliczki na media. <br>* Do kwoty najmu należy doliczyć 23% podatku VAT.</p><p></p><p><strong>Serdecznie zapraszam na prezentację!</strong></p>
      `,
  });
});

const saveData = async () => {
  isLoading.value = true;
  await new Promise((resolve) => {
    setTimeout(() => {
      isLoading.value = false;
      resolve("");
    }, 1000);
  });
  console.log("saveData");
  console.log(editor.value?.getHTML());
};
onBeforeUnmount(() => {
  if (!editor.value) {
    return;
  }
  editor.value.destroy();
});
</script>

<style lang="scss">
.editor-buttons-wrapper {
  & button {
    font-size: inherit;
    font-family: inherit;
    color: #000;
    margin: 0.1rem;
    border: 1px solid black;
    border-radius: 0.3rem;
    padding: 0.1rem 0.4rem;
    background: white;
    accent-color: black;
    &.is-active {
      // font-weight: bold;
      background: black;
      color: #fff;
    }
  }
}
</style>
