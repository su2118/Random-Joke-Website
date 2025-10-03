const card = document.getElementById('jokeCard');
const setup = document.getElementById('setup');
const punchline = document.getElementById('punchline');

let showingPunchline = false;

async function loadJoke() 
{
  showingPunchline = false;
  punchline.classList.add('hidden');
  setup.textContent = 'Loading...';

  try
  {
    const res = await fetch('/api/joke/random');
    if(!res.ok)
    {
      throw new Error('Fetch failed');
    }
    const joke = await res.json();

    setup.textContent = joke.setup;
    punchline.textContent = joke.punchline;
  }
  catch(err)
  {
    setup.textContent = 'Failed to load a joke.';
    punch.textContent = '';
  }
  
}

card.addEventListener('click', () => 
{
  if (!showingPunchline) 
  {
    punchline.classList.remove('hidden');
    showingPunchline = true;
  } 
  else 
  {
    loadJoke();
  }
});

loadJoke();
