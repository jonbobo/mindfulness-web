export function renderAboutPage(container) {
    container.innerHTML = `
        <div class="container">
            <h1 class="main-title">About Me</h1>

            <div class="section">
                <img 
                    src="/aboutpage/thailand.jpg" 
                    alt="Retreat in Thailand"
                    class="profile-image"
                />

                <p class="emphasis">
                    Hi! I'm Derek, a Chess Coach and meditation enthusiast passionate about helping people 
                    navigate the complexities of modern life through intentional awareness and personal growth.
                </p>

                <h2 class="section-title">My Journey</h2>
                <p> My exploration of mindfulness began during a spontaneous solo trip to Thailand, where I met a monk
                    named Phra KK who introduced me to the fundamentals of Buddhism and meditation. We meditated in the mountains for several days, 
                    completely disconnected from technology and communication with each other. This transformative experience
                    profoundly shaped my approach to life and subsequently influenced my work as a chess coach. <br><br>
                    I now see strong parallels between mindfulness and chess, where focus and awareness guide strategic decision-making. As an instructor
                    for elementary school students, I've observed a common pitfall: players who rush through the game, making moves purely through untested
                    intuition. My lessons mirror the core themes of mindfulness: to take a deep breath, to pause, and to think objectively—leaving emotions 
                    aside and focusing intently on the present moment.<br><br>
                    While this approach may sound simple, it requires constant practice to become second nature. Through mindful training, my students have
                    learned the critical importance of carefully analyzing their chess positions. They've become less nervous during games and more confident 
                    in their moves. More importantly, I've witnessed how building mindfulness benefits students not just in chess, but in their broader life
                    experiences. Many have gone on to improve their academic grades and enhance their performance in sports, demonstrating the far-reaching impact of a mindful approach.
                </p>
            </div>

            <div class="section">
                <h2 class="section-title">Core Skills</h2>
                <div class="skills-grid">
                    <div class="skill-card">
                        <h3 class="subsection-title">Meditation Coaching</h3>
                        <p>Guiding individuals through personalized meditation techniques tailored to their unique needs.</p>
                    </div>
                    <div class="skill-card">
                        <h3 class="subsection-title">Mindfulness Training</h3>
                        <p>Creating workshops and programs that integrate mindfulness into daily personal and professional life.</p>
                    </div>
                    <div class="skill-card">
                        <h3 class="subsection-title">Digital Wellness</h3>
                        <p>Developing strategies to maintain mental health in an increasingly connected world.</p>
                    </div>
                    <div class="skill-card">
                        <h3 class="subsection-title">Stress Management</h3>
                        <p>Teaching evidence-based techniques for reducing anxiety and improving emotional regulation.</p>
                    </div>
                </div>
            </div>

            <div class="section">
                <h2 class="section-title">Certifications & Training</h2>
                <ul>
                    <li>Certified Meditation Instructor, Mindfulness Institute</li>
                    <li>Advanced Mindfulness Practitioner Certification</li>
                    <li>Digital Wellness and Mental Health Counseling</li>
                </ul>
            </div>

            <div class="section">
                <h2 class="section-title">Connect With Me</h2>
                <div class="contact-links">
                    <a href="#" class="nav-mindfulness">Email</a>
                    <a href="#" class="nav-meditation">LinkedIn</a>
                    <a href="#" class="nav-relationship">Book a Session</a>
                </div>
            </div>

            <div class="section">
                <h2 class="section-title">My Philosophy</h2>
                <p class="emphasis">
                    "In a world of constant noise and distraction, true wisdom lies in the ability to be fully 
                    present, to listen deeply - both to yourself and to others."
                </p>
            </div>
        </div>
    `;
}