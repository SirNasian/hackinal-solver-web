import { createApp } from "vue"

import Aura from "@primeuix/themes/aura"
import PrimeVue from "primevue/config"

import Button from "primevue/button"
import Dialog from "primevue/dialog"
import InputText from "primevue/inputtext"
import Listbox from "primevue/listbox"
import Select from "primevue/select"

import App from "./App.vue"

const app = createApp(App);
app.use(PrimeVue, { theme: { preset: Aura } });

app.component("Button", Button);
app.component("Dialog", Dialog);
app.component("InputText", InputText);
app.component("Listbox", Listbox);
app.component("Select", Select);

app.mount("#root");
