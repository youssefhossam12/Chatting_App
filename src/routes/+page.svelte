<script lang="ts">
    import { onMount } from "svelte";
    import Message from "../components/message.svelte";
  
    export let data;
  
    let authState = data.auth.authState;
    let currentFirestoreUser = data.firestore.currentFirestoreUser;
    let messages = data.firestore.messagesState;
  
    let loggingIn = false;
  
    async function handleClick() {
      await data.auth.signInWithGoogle();
    }
  
    let currentInput = "";
  
    function handleSubmit() {
      if (currentInput == "") {
        return;
      }
  
      data.firestore.sendMessage(currentInput);
  
      currentInput = "";
    }
  
    let scrollView: HTMLElement | null;
  
    $: if ($messages && scrollView != null) {
      scrollView.scroll({ top: scrollView.scrollHeight, behavior: "smooth" });
    }
  </script>
  
  {#if $authState == null}
    <main class="center">
      <button on:click={handleClick} disabled={loggingIn}>
        LogIn Using Google
      </button>
    </main>
  {:else if $currentFirestoreUser == null}
    <main class="center">
      <span>Loading User Data...</span>
    </main>
  {:else}
    <main class="app-container">
      <nav>
        <span class="header-title"> Chatting using Sveltekit And Firebase ☻ </span>
  
        <div class="action">
          <button on:click={() => data.auth.auth.signOut()}>Sign Out</button>
        </div>
      </nav>
  
      <div class="chat-container">
        <div class="chat" bind:this={scrollView}>
          {#each $messages.reverse() as message}
            <div class="message">
              {#if message.userid == $currentFirestoreUser.uid}
                <div />
              {/if}
  
              <Message {message} />
  
              {#if message.userid != $currentFirestoreUser.uid}
                <div />
              {/if}
            </div>
          {/each}
        </div>
      </div>
  
      <form on:submit|preventDefault={handleSubmit} class="message-form">
        <input type="text" bind:value={currentInput} />
  
        <button type="submit">Send Message</button>
      </form>
    </main>
  {/if}
  
  <style>
    nav {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 20px;
        background-color: #2ecc71; /* Emerald green */
        height: 5px;
        font-family: 'Arial', sans-serif;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Soft drop shadow */
    }
  
    .header-title {
        font-size: 1.2em;
        color: #fff; /* White text color */
        text-transform: uppercase;
        margin-left: auto;
    }

    .action {
        color: #fff; /* White text color */
        text-transform: uppercase;
        margin-left: auto;
        cursor: pointer;
        transition: color 0.3s ease;
    }

    
  
    .chat-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: calc(100vh - 90px);
        background-color: #c6c6c6; /* Light gray background */
        font-family: 'Arial', sans-serif;
    } 

    .chat {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        overflow-y: scroll;
        overflow-x: hidden;
        width: 100%;
        max-width: 700px;
        height: 100%;
        padding: 20px;
        background-color: #fff; /* White background */
        border-radius: 10px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Soft drop shadow */
    }

    .message {
        margin: 8px; /* Increased margin for better separation */
        display: flex;
        justify-content: space-between;
        width: 100%;
    }

    .message-form {
        height: auto; /* Auto height */
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 16px;
        padding: 1px; /* Padding for better spacing */
        background-color: #50184c; /* White background */
        border-radius: 8px; /* Rounded corners */
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Drop shadow */
    }

    @media (max-width: 800px) {
        nav {
            flex-direction: column;
            height: auto;
        }

        .chat-container {
            height: calc(100vh - 120px);
            background-color: #f0f8ff; /* Alice blue */
        }
    }

        input {
            flex: none;
            padding: 8px;
            font-size: 1em;
            border: none;
            border-radius: 6px;
            outline: none;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        main.center {
            display: flex;
            justify-content: center;
         align-items: center;
            height: 100vh;
        }

        button {
            border: none;
            background-color: #3498db; /* Blue button */
            padding: 12px 20px;
            border-radius: 6px;
            font-size: 1em;
            color: #fff; /* White text color */
            transition: background-color 0.3s ease;
            cursor: pointer;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        button:hover {
            background-color: #0056b3; /* Darker blue on hover */
        }

        button:active {
         background-color: #004080; /* Even darker blue on active */
        }
</style>