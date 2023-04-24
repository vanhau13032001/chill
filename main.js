const $=document.querySelector.bind(document);
const $$=document.querySelectorAll.bind(document);
const player=$('.player');
const heading=$('header h2');
const cdThumb= $('.cd-thumb');
const audio=$('#audio');
const cd = $('.cd');
const playbtn=$('.btn-toggle-play')
const progress=$('#progress')
const nextbtn =$('.btn-next')
const prevbtn=$('.btn-prev')
const randombtn =$('.btn-random')
const btnrepeat =$('.btn-repeat')
const playlist=$('.playlist')
const app={
    currentindex: 0,
    isplay:false,// tạo 1 biến hiện tại có phát nhạc hay không 
    israndom:false,
    isrepeat:false,// tạo 1 biến có lặp hay không 
    songs:[
        {
            name :'Chuyện Đôi Ta',
            singer:' Emcee L, Muộii',
            path:'./music/chuyen_doi_ta.mp3',
            img:'./img/images1.jpg'
        },
        
        {
            name :'All Of Me',
            singer:'John Legend',
            path:'./music/AllOfMe-JohnLegend.mp3',
            img:'./img/cr7_2.jpg'
        },
        {
            name :'Bài Này Chill Phết',
            singer:'Chú Đen Vâu',
            path:'./music/bainaychillphet.mp3',
            img:'./img/cr7_3.jpg'
        },
        {
            name :'Apologize',
            singer:'Timbaland',
            path:'./music/Apologize-Timbaland.mp3',
            img:'./img/cr7_4.jpg'
        },
        {
            name :'Criminal',
            singer:'Britney Spears',
            path:'./music/Criminal-BritneySpears.mp3',
            img:'./img/cr7_7.jpg'
        },
        {
            name :'Hall Of Fame',
            singer:'The Script',
            path:'./music/Hall_Of_Fame.mp3',
            img:'./img/cr7_9.jpg'
        },
        {
            name :'Hold On',
            singer:'Nightcore ChordOverstreet',
            path:'./music/HoldOn-NightcoreChordOverstreet.mp3',
            img:'./img/cr7_7.jpg'
        },
        {
            name :'Let Her Go',
            singer:'Passenger',
            path:'./music/LetHerGo-Passenger.mp3',
            img:'./img/cr7_21.jpg'
        },
        {
            name :'Let Me Down Slowly',
            singer:'AlecBenjamin',
            path:'./music/LetMeDownSlowly-AlecBenjamin.mp3',
            img:'./img/cr7_17.jpg'
        },
        {
            name :'So Far Away Acoustic',
            singer:'AdamChristopher',
            path:'./music/SoFarAwayAcoustic-AdamChristopher.mp3',
            img:'./img/cr7_18.jpg'
        },
        {
            name :'TillICollapse',
            singer:'Eminem',
            path:'./music/TillICollapse-Eminem.mp3',
            img:'./img/cr7_19.jpg'
        },
        {
            name :'Not Afraid',
            singer:'Eminem',
            path:'./music/NotAfraid-Eminem.mp3',
            img:'./img/cr7_20.jpg'
        },
        {
            name :'Fake Love',
            singer:'Englissh Cover',
            path:'./music/FakeLoveEnglishCover-Nightcore-5873064.mp3',
            img:'./img/cr7_21.jpg'
        },
        {
            name :'Dusk Till Dawn',
            singer:'ZaynSia',
            path:'./music/DuskTillDawn-ZaynSia-5164057.mp3',
            img:'./img/cr7_22.jpg'
        },
        {
            name :'Dynasty',
            singer:'Miia',
            path:'./music/Dynasty-Miia-3843630.mp3',
            img:'./img/cr7_3.jpg'
        },
        {
            name :'Numb',
            singer:'Linkin Part',
            path:'./music/Numb-LinkinPark.mp3',
            img:'./img/cr7_4.jpg'
        },
        {
            name :'That Girl',
            singer:'Linkin Part',
            path:'./music/ThatGirl-OllyMurs.mp3',
            img:'./img/cr7_5.jpg'

        },
        {
            name :'Unstoppable',
            singer:'Sia',
            path:'./music/Unstoppable-Sia-9034865.mp3',
            img:'./img/cr7_6.jpg'
        },
        {
            name :'Perfect',
            singer:'Edsheeran',
            path:'./music/Perfect-EdSheeran-6445593.mp3',
            img:'./img/cr7_8jpg.jpg'
        },
        {
            name :'Until You',
            singer:'Shayne Ward',
            path:'./music/UntilYou-ShayneWard.mp3',
            img:'./img/cr7_7.jpg'
        },
        {
            name :'Until You',
            singer:'Shayne Ward',
            path:'./music/UntilYou-ShayneWard.mp3',
            img:'./img/cr7_7.jpg'
        },
       
    ],
    render:function(){
        const htmls=this.songs.map((song ,index)=>{
            return`
            <div class="song ${index===this.currentindex ? 'active':''}" data-index="${index}">
                 <div class="thumb" style="background-image: url('${song.img}')">
                 </div>
                        <div class="body">
                            <h3 class="title">${song.name}</h3>
                            <p class="author">${song.singer}</p>
                        </div>
                        <div class="option">
                            <i class="fas fa-ellipsis-h"></i>
                        </div>
            </div>`
        })
         $('.playlist').innerHTML = htmls.join('')
    },
    defineproperties:function(){
        Object.defineProperty(this,'curentsong',{
            get: function(){
                return this.songs[this.currentindex];
             }
            })
    },
    handlevent:function(){
        const _this=this;
        const cdwidth=cd.offsetWidth;
        //xử lý cd quay 
         const cdThumbanimate= cdThumb.animate([
            {transform :'rotate(360deg)'

            }],
            {
                duration:10000,
                iterations:Infinity
            }
        )
        cdThumbanimate.pause();
        // xử lý phóng to thu nhỏ CD 
        document.onscroll=function(){
           const scrollTop= window.scrollY || document.documentElement.scrollTop
           const newcdwidth=cdwidth-scrollTop;
           cd.style.width  =newcdwidth>0?newcdwidth +'px':0;//về o về bă
           cd.style.opacity  =newcdwidth/cdwidth;
        }
       //Xử lý khi click play 
       playbtn.onclick = function(){
           if(_this.isplay){
            audio.pause();
           }
           else{
            audio.play();
           }
           
       }
      
       //khi song được play 
       audio.onplay=function(){
           _this.isplay=true;
           player.classList.add("playing");
           cdThumbanimate.play();
       }
       //khi bị pause
       audio.onpause=function(){
           _this.isplay=false;
           player.classList.remove("playing");
           cdThumbanimate.pause();
       }
       //khi tiến độ bài hát thay đổi 
       audio.ontimeupdate=function(){
           if(audio.duration){
               const progresspercent = Math.floor(audio.currentTime /audio.duration * 100);
               progress.value=progresspercent;
           }
       }
       //khi song được thay đổi 

        //xủ lý khi tua song 
       progress.onchange=function(e){
           const seektime=audio.duration/100*e.target.value;
           audio.currentTime=seektime;
       }
      // XỬ lý qua bài 
       nextbtn.onclick=function()
       {
           if(_this.israndom)
           {
               _this.playrandomsong();
           }
           else{
               _this.nextSong();
           }
            audio.play();
            _this.render();
            _this.scolltoactivesong();
       }
       //xử lý trở lại 
       prevbtn.onclick=function()
       {
        if(_this.israndom){
            _this.playrandomsong();
        }
        else{
            _this.prevSong();
        }
         audio.play();
         _this.render();
         _this.scolltoactivesong();
       }
       randombtn.onclick=function(){
           _this.israndom=!_this.israndom;
           randombtn.classList.toggle('active',_this.israndom);
       }
      // qua bài khi hết bài hát
       audio.onended=function(){
           if(_this.isrepeat){
             audio.play();
           }
           else{
            _this.nextSong();
           }
           if(_this.israndom)
           {
               _this.playrandomsong();
           }
           else{
               _this.nextSong();
           }
           _this.scolltoactivesong();
           _this.render();
           audio.play();
       }
       //xử lý lặp khi hết bài 
       btnrepeat.onclick=function(){
           _this.isrepeat=!_this.isrepeat;
           btnrepeat.classList.toggle('active',_this.isrepeat);
    }
     playlist.onclick=function(e)
     {
         const nodesong=e.target.closest('.song:not(.active)');
       if(nodesong||e.target.closest('.option'))
       {
        if(nodesong){
            _this.currentindex=Number(nodesong.dataset.index);
            _this.loadcurrentsong();
            _this.render();
             audio.play();
        }
       }
       //sử lý khi click vào song 
     }
},
    loadcurrentsong: function(){
        
        heading.textContent=this.curentsong.name;
        cdThumb.style.backgroundImage = `url('${this.curentsong.img}')`;
        audio.src=this.curentsong.path;
       // console.log(heading,cdThumb,audio);
    },
    nextSong: function(){
        this.currentindex++
        if(this.currentIndex >= this.songs.length){
          this.currentIndex = this.songs.length;
        }
        this.loadcurrentsong();
      },
      prevSong: function(){
        this.currentindex--
        if(this.currentIndex < 0){
          this.currentIndex = this.songs.length-1;
        }
        this.loadcurrentsong();
      },
      playrandomsong: function(){
        let newindex
        do{
            newindex=Math.floor(Math.random()*this.songs.length)
        }
        while(newindex===this.currentindex)
        {
            this.currentindex=newindex;
            this.loadcurrentsong();
        }
        },
        scolltoactivesong:function()
        {
            setTimeout(function()
            {
                $('.song.active').scrollIntoView({
                    behavior:'smooth',
                    block:'nearest'
                })
            },300)
            
            
        },
    start:function(){
        //định nghĩa các thuộc tính cho object
        this.defineproperties()
        //lắng nghe xử lý sự kiện 
        this.handlevent()
        //tải thôn tin bài hát đầu tiên 
        this.loadcurrentsong()
        //render playlist
        this.render()
        this.scolltoactivesong();
    }
    
}
app.start()