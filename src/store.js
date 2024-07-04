import {reactive} from 'vue';

export const store = reactive({
    apiBaseUrl: 'http://127.0.0.1:8000/api',
    imgBasePath: 'http://127.0.0.1:8000/storage/',
    defaultImg: '', // da definire un'immagine di default
    apiKey: 'asaWBwoExgAHW5YiZqt39Vw8NtJFJwaF',
});