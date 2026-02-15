<script setup lang="ts">
import { computed, ref } from 'vue';

const _words = ref<string[]>([]);
const _match = ref<string>("");
const _selected = ref<string | null>(null);
const _digits = computed(() => [0].concat(_selected.value.split("").map((_, index) => index + 1)));

const insertWord = () => {
	const match = _match.value.toUpperCase();

	if (_match.value === "") return;
	if (_words.value.includes(match)) return;

	_words.value.push(match);
	_match.value = "";
}

const deleteWord = () => {
	_words.value = _words.value.filter(word => word !== _selected.value);
	_selected.value = null;
}

const filterWords = (similarity: number) => {
	_words.value = _words.value.filter((word) => {
		if (word.length !== _selected.value.length)
			return false;
		const score = word.split("").reduce((acc, c, i) => acc + (c === _selected.value[i] ? 1 : 0), 0);
		return score === similarity;
	});
	_selected.value = null;
}
</script>

<template>
	<div id="content-wrapper">
		<Listbox
			:options="_words"
			emptyMessage=" "
			listStyle="max-height:100%"
			v-model:modelValue="_selected"
		/>
		<div class="input-group">
			<InputText
				@keypress="({ key }) => key == 'Enter' && insertWord()"
				v-model="_match"
			/>
			<Button
				@click="insertWord"
				label="+"
			/>
		</div>
	</div>
	<Dialog
		:draggable="false"
		:pt="{ content: { style: 'display: flex; gap: 0.5rem; padding: 1rem' } }"
		:showHeader="false"
		:visible="Boolean(_selected)"
		@update:visible="() => _selected = null"
		modal
	>
		<template #default>
			<Select
				:options="_digits"
				@update:modelValue="filterWords"
			/>
			<Button severity="danger" label="x" @click="deleteWord" />
		</template>
	</Dialog>
</template>

<style scoped>
#content-wrapper {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	height: 100%;
	width: 100%;

	max-width: 32rem;
	min-width: 12rem;

	gap: 0.5rem;
	margin: auto;
	padding: 1rem;
}

.p-listbox {
	height: 100%;
	width: 100%;

	min-height: 8rem;
	max-height: 24rem;
}

.input-group {
	display: flex;
	width: 100%;
	gap: 0.5rem;
}

.input-group > input {
	flex: 1 1 0;
	min-width: 0;
}

.input-group > button {
	flex: 0 0 3rem;
}
</style>
