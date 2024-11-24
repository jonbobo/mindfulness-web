export function renderHomepage(container) {
    container.innerHTML = `
        <div class="container">

            <h1 class="main-title">Understanding Mindfulness and Meditation: A Practical Guide</h1>
            <nav class="nav-index">
                <ul>
                    <li><a href="#mindfulness" class="nav-mindfulness">What is Mindfulness?</a></li>
                    <li><a href="#meditation" class="nav-meditation">What is Meditation?</a></li>
                    <li><a href="#relationship" class="nav-relationship">Relationship</a></li>
                    <li><a href="#challenges" class="nav-challenges">Modern Challenges</a></li>
                    <li><a href="#practice" class="nav-practice">Getting Started</a></li>
                </ul>
            </nav>
            
            <div id="mindfulness" class="section">
                <h2 class="section-title">What is Mindfulness?</h2>
                <img 
                    src="/forum/brainfood.jpeg" 
                    alt="Person sitting peacefully in nature, demonstrating present-moment awareness"
                    class="section-image"
                />
                <p>Mindfulness is the practice of being fully present and engaged in the current moment, without judgment or distraction. In our modern world, this skill has become increasingly valuable yet challenging to maintain. The constant bombardment of digital stimuli through platforms like:</p>
                <ul>
                    <li>TikTok</li>
                    <li>YouTube Shorts</li>
                    <li>Instagram Reels</li>
                </ul>
                <p>has fragmented our attention spans and created patterns of mindless consumption.</p>
                
                <h3 class="subsection-title">True mindfulness involves:</h3>
                <ul>
                    <li>Conscious awareness of your surroundings</li>
                    <li>Recognition of your thoughts and feelings</li>
                    <li>Engagement with the present moment</li>
                    <li>Release of past regrets and future anxieties</li>
                    <li>Acceptance of current experiences without judgment</li>
                </ul>
            </div>
            
            <div id="meditation" class="section">
                <h2 class="section-title">What is Meditation?</h2>
                <img 
                    src="/forum/meditation.jpeg" 
                    alt="Person sitting peacefully in nature, demonstrating present-moment awareness"
                    class="section-image"
                />

                <p>Meditation is a structured practice that cultivates mindfulness through intentional observation. Unlike the common misconception that meditation requires emptying your mind, it actually involves:</p>
                
                <h3 class="subsection-title">Core Principles:</h3>
                <ul>
                    <li>Observing thoughts and feelings as they arise</li>
                    <li>Acknowledging these mental experiences without attachment</li>
                    <li>Practicing non-judgmental awareness</li>
                    <li>Developing the skill of gentle attention</li>
                </ul>

                <h3 class="subsection-title">Key Benefits:</h3>
                <ul>
                    <li>Reduced stress and anxiety</li>
                    <li>Improved focus and concentration</li>
                    <li>Enhanced emotional regulation</li>
                    <li>Better self-awareness</li>
                    <li>Increased mental clarity</li>
                    <li>Greater sense of inner peace</li>
                </ul>
            </div>

            <div id="relationship" class="section">
                <h2 class="section-title">The Relationship Between Mindfulness and Meditation</h2>
                <img 
                    src="/forum/mindfulness-vs-meditation.jpg" 
                    alt="Person sitting peacefully in nature, demonstrating present-moment awareness"
                    class="section-image3"
                />
                <p>Think of mindfulness as the quality you're developing, while meditation is the formal practice that helps cultivate this quality. Meditation serves as a gymnasium for mindfulness – a dedicated time and space where you strengthen your "mindfulness muscles" through deliberate practice.</p>
            </div>

            <div id="challenges" class="section">
                <h2 class="section-title">Modern Challenges to Mindfulness</h2>
                <img 
                    src="/forum/distractions.jpeg" 
                    alt="Person sitting peacefully in nature, demonstrating present-moment awareness"
                    class="section-image"
                />
                <h3 class="subsection-title">Digital Distractions:</h3>
                <ul>
                    <li>Social media algorithms designed for endless scrolling</li>
                    <li>Constant notifications and updates</li>
                    <li>Short-form content that reduces attention spans</li>
                    <li>The fear of missing out (FOMO)</li>
                    <li>Information overload</li>
                </ul>

                <h3 class="subsection-title">Counteracting These Challenges:</h3>
                <ol>
                    <li>Set specific times for social media use</li>
                    <li>Create device-free zones or periods</li>
                    <li>Practice mindful consumption of digital content</li>
                    <li>Establish regular meditation sessions</li>
                    <li>Build moments of mindfulness into daily routines</li>
                </ol>
            </div>

            <div id="practice" class="section">
                <h2 class="section-title">Getting Started with Meditation</h2>
                <img 
                    src="/forum/sisyphus.jpeg" 
                    alt="Person sitting peacefully in nature, demonstrating present-moment awareness"
                    class="section-image"
                />
                <h3 class="subsection-title">Basic Meditation Practice:</h3>
                <ol>
                    <li>Find a quiet, comfortable space</li>
                    <li>Set a timer (start with 5-10 minutes)</li>
                    <li>Sit in a comfortable position</li>
                    <li>Focus on your breath</li>
                    <li>Notice when your mind wanders</li>
                    <li>Gently return attention to your breath</li>
                    <li>Continue this process without self-criticism</li>
                </ol>

                <h3 class="subsection-title">Common Challenges:</h3>
                <ul>
                    <li>Restlessness</li>
                    <li>Racing thoughts</li>
                    <li>Physical discomfort</li>
                    <li>Doubt and self-judgment</li>
                    <li>Distractions</li>
                </ul>
                
                <p class="emphasis">Remember: These challenges are normal and part of the practice. Success in meditation isn't measured by how few thoughts you have, but by how gently you return to your focus when distracted. <br>
                <span class="attribution">-Sun tzu</span> </p>
            </div>

            <div class="section">
                <h2 class="section-title">Integrating Mindfulness into Daily Life</h2>
                <p>Mindfulness can extend beyond formal meditation sessions:</p>
                <ul>
                    <li>Mindful eating: Fully experiencing each bite</li>
                    <li>Mindful walking: Paying attention to each step</li>
                    <li>Mindful listening: Giving others your full attention</li>
                    <li>Mindful working: Focusing on one task at a time</li>
                    <li>Mindful breathing: Taking conscious breaths throughout the day</li>
                </ul>
            </div>

            <div class="section">
                <h2 class="section-title">Conclusion</h2>
                <p>In our increasingly distracted world, mindfulness and meditation offer valuable tools for maintaining mental clarity and emotional balance. While technology and social media can pull us away from the present moment, regular mindfulness practice helps us stay grounded and connected to our immediate experience. Remember that both mindfulness and meditation are skills that develop with practice, patience, and self-compassion.</p>
            </div>
        </div>
    `;

    // Add smooth scrolling after the content is rendered
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
}