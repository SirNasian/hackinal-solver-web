import { createApp } from "vue"

import Aura from "@primeuix/themes/aura"
import PrimeVue from "primevue/config"

import Button from "primevue/button"
import Dialog from "primevue/dialog"
import InputNumber from "primevue/inputnumber"
import InputText from "primevue/inputtext"
import Listbox from "primevue/listbox"

import App from "./App.vue"

const app = createApp(App);
app.use(PrimeVue, { theme: { preset: Aura } });

app.component("Button", Button);
app.component("Dialog", Dialog);
app.component("InputNumber", InputNumber);
app.component("InputText", InputText);
app.component("Listbox", Listbox);

app.mount("#root");
