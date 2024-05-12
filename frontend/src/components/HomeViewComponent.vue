<template>
    <div>
        <header>
            <div class="flex flex-wrap justify-between items-center wrapper p-4 text-lg font-semibold">
                <h1 class="flex font-bold text-3xl">CHAT APP</h1>
                <nav class="flex flex-wrap">
                    <div class="bg-blue-500 w-fit p-2 rounded-md mx-2">
                        <router-link to="#home"><i class="fa-solid fa-house"></i></router-link>
                    </div>
                    <div class="bg-blue-500 w-fit p-2 rounded-md mx-2">
                        <router-link to="#message"><i @click="hide = !hide"
                                class="fa-solid fa-message"></i></router-link>
                    </div>
                    <div class="bg-blue-500 w-fit p-2 rounded-md mx-2">
                        <router-link to="#music"><i class="fa-solid fa-music"></i></router-link>
                    </div>
                    <div class="bg-blue-500 w-fit p-2 rounded-md ml-4">
                        <i class="fa-solid fa-power-off"></i>
                    </div>
                </nav>
            </div>
            <hr />
        </header>
    </div>

    <!-- home -->
    <div id="message" v-if="hide"
        class="bottom-4 w-1/3 h-full fixed right-0 top-28 text-black rounded-xl overflow-y-auto">
        <div class="flex float-right" @click="hide = !hide"><i
                class="fa-regular fa-circle-xmark hover:cursor-pointer text-2xl p-2"></i></div>
        <div>
            <ul id="chatMessages">
                <li v-for="msg in chatMessages" :key="msg.id" class="bg-gray-200 rounded-lg p-2 mb-2">{{ msg.text }}
                </li>
            </ul>
        </div>
        <div class="text-center bg-gray-200 p-4 bottom-0 right-0 fixed w-1/3">
            <input type="text" id="messageInput" placeholder="Type your message" v-model="chat"
                class="border border-solid border-black rounded-lg p-2 text-black">
            <button @click="sendMessage" class="bg-blue-500 rounded-lg p-2 ml-4">Send</button>
        </div>
    </div>

</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { io } from 'socket.io-client';

const chat = ref([]);
const chatMessages = ref([]);
const hide = ref(false);

const api = 'http://localhost:3001'
const socket = io('http://localhost:3000');

socket.on("message", (message) => {
    const chatMessages = document.getElementById('chatMessages');
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(message));
    chatMessages.appendChild(li);
});

async function sendMessage() {
    try {
        const messageInput = document.getElementById("messageInput");
        const message = messageInput.value;
        if (!message.trim()) {
            return;
        }
        socket.emit('message', message);

        const response = await axios.post(`${api}/chat`, {
            username: localStorage.isUser,
            message: chat.value
        });
        console.log(response);
    } catch (error) {
        console.log(error);
    }
    messageInput.value = '';
}

onMounted(async () => {
    try {
        const response = await axios.get('spotifyPlaylist');
        console.log();
    } catch (error) {
        console.error('Error fetching playlist:', error);
    }
});
</script>