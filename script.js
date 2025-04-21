// Mobile Navigation
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-links li');

burger.addEventListener('click', () => {
    // Toggle Navigation
    nav.classList.toggle('active');

    // Animate Links
    navLinks.forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = '';
        } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        }
    });

    // Burger Animation
    burger.classList.toggle('toggle');
});

// Close mobile menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
        burger.classList.remove('toggle');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Form submission with validation
const contactForm = document.getElementById('contact-form');
const successModal = document.getElementById('success-modal');
const closeModal = document.querySelector('.close-modal');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Basic validation
        if (!data.name || !data.email || !data.message) {
            alert('Please fill in all fields');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            alert('Please enter a valid email address');
            return;
        }
        
        // Here you would typically send the data to a server
        console.log('Form submitted:', data);
        
        // Show success modal
        successModal.style.display = 'flex';
        contactForm.reset();
    });
}

// Close modal when clicking the close button
if (closeModal) {
    closeModal.addEventListener('click', () => {
        successModal.style.display = 'none';
    });
}

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === successModal) {
        successModal.style.display = 'none';
    }
});

// Add scroll animation for sections
const sections = document.querySelectorAll('section');
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            // Add active class to current section in navigation
            const id = entry.target.getAttribute('id');
            document.querySelector(`.nav-links a[href="#${id}"]`)?.classList.add('active');
        } else {
            // Remove active class from navigation
            const id = entry.target.getAttribute('id');
            document.querySelector(`.nav-links a[href="#${id}"]`)?.classList.remove('active');
        }
    });
}, observerOptions);

sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'all 0.5s ease-out';
    observer.observe(section);
});

// Add typing effect to hero section
const heroText = document.querySelector('.hero-content p');
if (heroText) {
    const text = heroText.textContent;
    heroText.textContent = '';
    let i = 0;

    function typeWriter() {
        if (i < text.length) {
            heroText.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        }
    }

    typeWriter();
}

// Add hover effect to project cards
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Blog posts data
const blogPosts = {
    1: {
        title: "Research on Sentiment and Chat Models 🧠💬",
        date: "Week 1 | 24/2/2025",
        content: `
            <p>This week, I dived deep into the world of sentiment analysis and chatbots. I began by understanding how sentiment models work — how they read human text and classify it into positive, negative, or neutral emotions. 🥲😊😡 I explored different approaches like rule-based systems, machine learning models, and more recent neural networks such as RNNs and transformers. It was super interesting to see how these models understand emotions just from words and patterns.</p>
            <p>Simultaneously, I also started learning about different chatbot architectures. Some of them are simple — like replying with pre-written responses — while others are complex and can talk like humans! 🤖 The transformer-based models really caught my attention, especially those used in tools like ChatGPT.</p>
            <p>Even though some concepts were hard to understand at first, reading articles, watching videos, and going through some papers helped me slowly piece things together. I realized how important it is for chatbots to not just talk, but also understand how users are feeling. ❤️</p>
            <p>All this research laid the foundation for the rest of the project. It made me confident and excited to move forward and actually build something that can understand and respond like a real friend. 🙌</p>
        `
    },
    2: {
        title: "Dataset Research and Exploration 📊🔍",
        date: "Week 2 | 3/3/2025",
        content: `
            <p>This part of the project was all about finding the right data to teach our model. I searched on platforms like Kaggle, Hugging Face, and other open repositories to find datasets related to sentiment analysis and emotional conversations. 📁 It was harder than I expected — most datasets were either too small, too noisy, or not suitable for conversational analysis.</p>
            <p>I eventually shortlisted a few datasets that included labeled sentences with emotional tags like joy, anger, fear, etc. Some also had chat-based formats which were a bonus. 🗨️ I spent time cleaning the data, removing irrelevant columns, and making sure it's formatted correctly for training. This step took patience but was very necessary.</p>
            <p>One thing I learned is how important good data is for a successful model. A poorly prepared dataset can totally confuse the model during training. 🧹 So I made sure everything was in order before even thinking about training.</p>
            <p>Overall, it was a productive week. Even though I didn't write any code, I feel this step really sets up the backbone of the entire project. Without quality data, no AI model can give quality results. 🔧💡</p>
        `
    },
    3: {
        title: "Explored Chatbot APIs such as OpenAI and Ollama 🤖🌐",
        date: "Week 3 | 10/3/2025",
        content: `
            <p>Once the basics were in place, I wanted to see how pre-built chatbot APIs work. So I started exploring APIs like OpenAI's ChatGPT and a local model tool called Ollama. I actually gave it a new name within the project so we could keep things organized. 💡</p>
            <p>OpenAI's API was super impressive — the replies were very human-like. But there were limitations in the free tier and using it online wasn't always ideal. ⚠️ That's when I discovered Ollama, which can run locally on your system. The idea of not needing internet and still getting good responses was exciting! 🚀</p>
            <p>I tried integrating both into our backend and tested their response times, quality, and flexibility. OpenAI was powerful but had limitations. Ollama felt more open and customizable, even though it required more resources.</p>
            <p>This exploration gave me a better understanding of what tools to use for which task, and helped me start thinking practically about what would work in our app. It was fun to test both and see how they each have strengths and weaknesses. 🎯</p>
        `
    },
    4: {
        title: "Tried to Integrate the Chatbot in Application 🛠️💬",
        date: "Week 4 | 17/3/2025",
        content: `
            <p>This week, I started integrating the chatbot into our MERN app. It sounded simple in theory: just send a user message and get a reply from the chatbot API. But in practice, it turned into hours of testing and debugging 😅.</p>
            <p>First, I created a backend route to take in user input and send it to the AI model (initially OpenAI, later Ollama). Then, I tried fetching this route from the frontend using Axios. But the responses were either super slow or sometimes never arrived at all. I had to deal with CORS issues, timeouts, and unexpected JSON errors. 🔧</p>
            <p>After fixing those, the chatbot finally started responding — it felt like a huge win! 🎉 Seeing replies come up in the UI made everything feel real. Even though the conversations were short and basic at this point, I was proud of this progress.</p>
            <p>It showed me how backend and frontend need to be in sync for things to work. And it reminded me that even small bugs can break everything. But I now had a chatbot talking to users through our app — and that felt amazing. 🧑‍💻💬</p>
        `
    },
    5: {
        title: "Model Experiments and Crashes 😓💥",
        date: "Week 5 | 24/3/2025",
        content: `
            <p>Here comes the tough part — model training. I tried building my own sentiment classifier using different models: CNN, BiLSTM, and even some hybrid approaches. Every time I trained a model, it either crashed my laptop 😵‍💫 or showed poor performance.</p>
            <p>Training deep learning models needs serious GPU power, which my system lacked. Still, I tried reducing the model size, batch size, and changing the optimizer — all to make it work. Sometimes it worked, but took hours to complete an epoch. Sometimes it just crashed midway.</p>
            <p>Despite these hurdles, I learned a LOT. I understood how each layer of a model contributes, how LSTMs capture sequential context, and how CNNs extract patterns. 📚 The experiments were tough, but very insightful.</p>
            <p>In the end, the BiLSTM model gave me the most consistent results, even if they weren't very accurate. These crashes and fails taught me not to give up and that model tuning is more trial-and-error than a straight formula.</p>
            <p>Honestly, it was a frustrating but very rewarding phase. 🔍⚙️</p>
        `
    },
    6: {
        title: "Model Evaluation – Best Accuracy with BiLSTM 📉🔎",
        date: "Week 6 | 31/3/2025",
        content: `
            <p>After a lot of testing, it was finally time to evaluate all the models I tried. Sadly, the results were not that great 😞. Most models had accuracy below 50%, which meant they were barely doing better than guessing.</p>
            <p>The CNN-based models were fast but didn't understand the sentence context very well. The RNNs gave better results but were slow. The BiLSTM model stood out, giving around 48–49% accuracy, which was the best I could get with the current dataset and setup.</p>
            <p>I was honestly disappointed at first, but I understood that this is part of the ML journey. Real-world models don't just work in one go. They need tuning, more data, and better processing techniques. 🔁</p>
            <p>Still, the BiLSTM results gave me hope. With more work, I could improve it. I'm thinking of adding better embeddings or increasing the dataset later.</p>
            <p>This week taught me to not chase high accuracy blindly, but to understand what the model is learning and why it fails. That's where real progress happens. 📊💡</p>
        `
    },
    7: {
        title: "Frontend Crashing and DB Connection Problem 💻🔥",
        date: "Week 7 | 7/4/2025",
        content: `
            <p>This was the most annoying week so far! 😤 The frontend kept crashing randomly, and worse — the backend sometimes couldn't connect to the MongoDB database. Every time I thought it was fixed, a new bug popped up.</p>
            <p>The chat section especially kept failing due to poor state management and long API response times. The UI would freeze, and React would throw strange errors. I checked component logic, API call structure, and even tried cleaning up the build. 🧪</p>
            <p>Then the backend gave me trouble — the DB connection string had a typo! 😵 I spent hours debugging before realizing it was a missing letter. Once fixed, things started working again.</p>
            <p>This week was more about fixing things that shouldn't break than building anything new. But these kinds of weeks are important. They teach you to stay calm, check everything step-by-step, and keep backups! 🧘‍♂️</p>
        `
    },
    8: {
        title: "Fixed Ollama History Issue – Improved Chat Responses 🔁🗨️",
        date: "Week 8 | 14/4/2025",
        content: `
            <p>One big issue I faced with Ollama was that it wasn't remembering past messages in a conversation. It treated each message like a new chat, so the replies made no sense contextually. 🤨</p>
            <p>After doing some reading and trial runs, I realized the fix was simple: send the entire chat history with each new query. I modified the backend so it stored and forwarded all previous messages with every API request. 📂📤</p>
            <p>The improvement was huge! 🥳 The bot started replying based on the full conversation, making the experience much more natural and friendly. It felt like the bot actually "knew" what we were talking about. This made the chat flow much smoother and less robotic.</p>
            <p>This was a small logic change but made a big difference in how the bot interacted. I also learned a lot about how context affects AI replies and how models use history to predict the next message.</p>
            <p>Definitely a highlight of the week! ✅🤖</p>
        `
    },
    9: {
        title: "Added Scrollbar and Journal Generation Feature 📜🧾",
        date: "Week 9 | 21/4/2025",
        content: `
            <p>This week, I focused on improving the user experience in the frontend. First, I added a scrollbar to the chat window so users can scroll up and read older messages. It might sound small, but it made the chat feel like a real app instead of a static tool. 💬📜</p>
            <p>Then came the exciting part — I started working on the journal generation feature. The idea is that the AI will take a day's chat and summarize it into a journal entry. I set up a function to gather all messages from a chat session and send them to the AI API, asking it to return a small reflective summary.</p>
            <p>The integration is done, but we're still facing some bugs — especially in how the summaries are stored or shown. Some errors pop up while parsing the AI response, but I'm working on it. 🐞⚙️</p>
            <p>Even though it's not perfect yet, I'm really excited about this feature. It adds meaning to the chats — turning conversations into something you can revisit and reflect on. Great end to the week! 🌟📘</p>
        `
    }
};

// Blog modal functionality
const blogModal = document.getElementById('blog-post-modal');
const blogTitle = document.getElementById('blog-post-title');
const blogDate = document.getElementById('blog-post-date');
const blogBody = document.getElementById('blog-post-body');
const blogCloseModal = document.querySelector('#blog-post-modal .close-modal');

// Add click event listeners to all "Read More" links
document.querySelectorAll('.read-more').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const postId = link.closest('.blog-card').dataset.postId;
        const post = blogPosts[postId];
        
        blogTitle.textContent = post.title;
        blogDate.textContent = post.date;
        blogBody.innerHTML = post.content;
        
        blogModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });
});

// Close modal when clicking the close button
blogCloseModal.addEventListener('click', () => {
    blogModal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

// Close modal when clicking outside the modal content
window.addEventListener('click', (e) => {
    if (e.target === blogModal) {
        blogModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}); 