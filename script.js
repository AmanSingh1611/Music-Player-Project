console.log("Welcome to Spotify");
let audio = new Audio('songs/1.mp3');
let masterPlay=document.getElementById('masterPlay');
let myProgressBar=document.getElementById('progressBar');
let gif=document.getElementById('gif');
let songIndex=1;
let naam=document.getElementById('na');
let songItems=Array.from(document.getElementsByClassName('songItem'));
let songs=[
	{song:"Late To The Party", filePath:"songs/1.mp3",coverPath:"cover/1.jpg"},
	{song:"Alone In The Room", filePath:"songs/2.mp3",coverPath:"cover/2.jpg"},
	{song:"All We Know", filePath:"songs/3.mp3",coverPath:"cover/3.jpg"},
	{song:"Hide (feat. Sneezyn)", filePath:"songs/4.mp3",coverPath:"cover/4.jpg"},
	{song:"Let Me (feat. Zayn)", filePath:"songs/5.mp3",coverPath:"cover/5.jpg"},
	{song:"All Girls Are The Same", filePath:"songs/6.mp3",coverPath:"cover/6.jpg"},
]
const makeAllPlay=()=>{
	Array.from(document.getElementsByClassName('playbutton')).forEach((element)=>{
		element.classList.remove('fa-circle-pause');
		element.classList.add('fa-circle-play');
	})
}
songItems.forEach(function (item,i) {
	item.getElementsByTagName('img')[0].src=songs[i].coverPath;
	item.getElementsByClassName('songName')[0].innerText=songs[i].song;
})

document.addEventListener('keyup',event=>{ 
	if(event.code==='Space'){
		if(audio.paused || audio.currentTime<=0){
			audio.play();
			masterPlay.classList.remove('fa-circle-play');
			masterPlay.classList.add('fa-circle-pause');
			gif.style.opacity=1;
		}
		else{
			audio.pause();
			masterPlay.classList.remove('fa-circle-pause');
			masterPlay.classList.add('fa-circle-play');
			gif.style.opacity=0;
		}
	}
})
masterPlay.addEventListener('click',()=>{
	if(audio.paused || audio.currentTime<=0){
		audio.play();
		masterPlay.classList.remove('fa-circle-play');
		masterPlay.classList.add('fa-circle-pause');
		gif.style.opacity=1;
	}
	else{
		audio.pause();
		makeAllPlay()
		masterPlay.classList.remove('fa-circle-pause');
		masterPlay.classList.add('fa-circle-play');
		gif.style.opacity=0;
	}
})

audio.addEventListener('timeupdate',()=>{
	progress=parseInt((audio.currentTime/audio.duration)*100);
	myProgressBar.value=progress;
});

myProgressBar.addEventListener('change',()=>{
	audio.currentTime = myProgressBar.value * audio.duration/100;
});



Array.from(document.getElementsByClassName('playbutton')).forEach((element)=>{
	element.addEventListener('click',(e)=>{
		songIndex=parseInt(e.target.id);
		makeAllPlay();
		e.target.classList.remove('fa-circle-play');
		e.target.classList.add('fa-circle-pause');
		audio.src=`songs/${songIndex}.mp3`;
		naam.innerText=songs[songIndex-1].song;
		audio.currentTime=0;
		audio.play();
		gif.style.opacity=1;
		masterPlay.classList.remove('fa-circle-play');
		masterPlay.classList.add('fa-circle-pause');
	})  
});

document.getElementById('next').addEventListener('click',()=>{
	if(songIndex>=6){
		songIndex=1;
	}else{
		songIndex+=1;
	}
	audio.src=`songs/${songIndex}.mp3`;
	audio.currentTime=0;
	audio.play();
	gif.style.opacity=1;
	naam.innerText=songs[songIndex-1].song;
	masterPlay.classList.remove('fa-circle-play');
	masterPlay.classList.add('fa-circle-pause');
})

document.getElementById('prev').addEventListener('click',()=>{
	if(songIndex<=1){
		songIndex=1;
	}else{
		songIndex-=1;
	}
	audio.src=`songs/${songIndex}.mp3`;
	audio.currentTime=0;
	audio.play();
	naam.innerText=songs[songIndex-1].song;
	masterPlay.classList.remove('fa-circle-play');
	masterPlay.classList.add('fa-circle-pause');
})



