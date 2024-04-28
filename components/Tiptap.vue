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
import { Editor, EditorContent } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import { Theme, ComponentType } from "@/components/Button/Button.props";
import Underline from "@tiptap/extension-underline";
const props = defineProps({
  tiptapContent: {
    type: String,
    default: "",
  },
});

const emit = defineEmits<{
  submit: [value: string];
}>();

const isLoading = ref(false);
const editor = ref<Editor>();

onMounted(() => {
  editor.value = new Editor({
    extensions: [StarterKit, Underline],
    content: props.tiptapContent,
    editorProps: {
      attributes: {
        class: "min-h-96 border",
      },
    },
  });
});

watch(
  () => props.tiptapContent,
  (newContent) => {
    if (editor.value) {
      editor.value.commands.setContent(newContent);
    }
  }
);

const saveData = async () => {
  if (!editor.value) {
    return;
  }
  console.log("saveData");
  // console.log();
  emit("submit", editor.value.getHTML());
  // isLoading.value = true;
  // await new Promise((resolve) => {
  //   setTimeout(() => {
  //     isLoading.value = false;
  //     resolve("");
  //   }, 1000);
  // });
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
      background: black;
      color: #fff;
    }
  }
}
</style>
