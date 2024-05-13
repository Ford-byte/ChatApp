<template>
    <div>
        <header>
            <div class="border-b border-solid border-black p-6 my-2 justify-center flex text-4xl font-bold">
                CHAT APP
            </div>
            <div class="form flex justify-center items-center">
                <div class="block border border-solid border-black p-8 m-4 justify-center items-center rounded-lg">
                    <input type="text" class="p-2 m-2 border border-solid border-black rounded-lg"
                        placeholder="Username" v-model="email">
                    <br>
                    <input type="password" class="p-2 m-2 border border-solid border-black rounded-lg"
                        placeholder="Password" v-model="password">
                    <br>
                    <div class="flex justify-center">
                        <button class="bg-blue-500 p-2 m-2 rounded-lg" @click="login">LOGIN</button>
                    </div>
                </div>
            </div>

        </header>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import router from '../router/index.js';

const localhost = 'http://localhost:3001';
const email = ref([]);
const password = ref([]);

const data = ref([]);

const login = () => {
    localStorage.setItem('isUser',email.value)
    if (!email.value || !password.value) {
        alert('Please input both Email and Password');
        return;
    }

    const user = data.value.find(user => user.email === email.value && user.password === password.value);

    if (user) {
        // alert('Login successful!');
        router.push('/');
    } else {
        alert('Invalid email or password');
    }
};

const fetchData = async () => {
    try {
        const result = await axios.get(`${localhost}/user`);
        data.value = result.data;
    } catch (error) {
        console.error(error);
    }
};

onMounted(() => {
    fetchData();
});
</script>

<style scoped>
.form {
    height: 75vh;
}
</style>
