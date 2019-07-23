# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
  
  bands = [{
    name: "Slayer",
    username: "band1",
    password: 'band1',
    email: "slayer@band.com",
    image_url: "https://i.ytimg.com/vi/QvcP5pCceek/maxresdefault.jpg",
    bio: 'Slayer is an American thrash metal band from Huntington Park, California. The band was formed in 1981 by guitarists Kerry King and Jeff Hanneman and vocalist and bassist Tom Araya. Slayers fast and aggressive musical style made them one of the founding "big four" bands of thrash metal, alongside',
    soundcloud: '<iframe width="100%" height="300" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/users/5947795&color=%2326eb1f&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe>',
    spotify: '<iframe src="https://open.spotify.com/embed/artist/1IQ2e1buppatiN1bxUVkrk" width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>',
    instruments: 'guitar, bass, drums',
    genres: 'metal hardcore',
    facebook: "https://www.facebook.com/slayer/",
    instagram: "https://www.instagram.com/slayerbandofficial/?hl=en"
    },
    {
    name: "Khalid",
    username: "band2",
    password: 'band2',
    email: "khalid@band.com",
    image_url: "https://media.gq.com/photos/5a625821df8e105e64e8df4b/16:9/w_1280,c_limit/Khalid_Shot_01-edit.jpg",
    bio: 'Khalid Donnel Robinson (born February 11, 1998) is an American singer and songwriter. He signed with Right Hand Music Group and RCA Records. His debut single, "Location", was released in July 2016 and peaked at number 16 on the US Billboard Hot 100 chart and was later certified quadruple platinum by the Recording Industry Association of America (RIAA). His debut studio album, American Teen,',
    soundcloud: '<iframe width="100%" height="300" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/users/177989887&color=%2326eb1f&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe>',
    spotify: '<iframe src="https://open.spotify.com/embed/artist/6LuN9FCkKOj5PcnpouEgny" width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>',
    instruments: 'voice, synth',
    genres: 'hip hop',
    facebook: "https://www.facebook.com/thegreatkhalid/",
    instagram: "https://www.instagram.com/thegr8khalid/?hl=en"
    },
    {
    username: 'band3',
    email: 'lakestreetdive@band.com',
    password: 'band3',
    name: 'Lake Street Dive',
    instruments: 'drums, guitar, voice, bass',
    genres: 'soul',
    spotify: '<iframe src="https://open.spotify.com/embed/artist/3nuc29fYGlQbIrwh4yrNWd" width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>',
    soundcloud: '<iframe width="100%" height="300" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/users/200556914&color=%2334919e&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe>',
    instagram: 'https://www.instagram.com/lakestreetdive/',
    facebook: 'https://www.facebook.com/lakestreetdive/?ref=br_rs',
    image_url: 'https://live.staticflickr.com/5484/30138010132_f47ff6def1_b.jpg',
    bio: 'Best Band Ever'
    }
]

listings = [
    {title: 'Looking for a Vocalist July 25th', 
    band_id: 1, 
    description: 'fill in', 
    instruments: 'voice'
    }, 
    {title: 'Drummer Opening for Lake Street Dive: Auditions 30th of August', 
    band_id: 'NAO', 
    description: 'substitute for our last show!', 
    instruments: 'banjo', 
    },
    {title: "New Vocalist",
    description: "auditions on this day at this time!",
    instruments: "voice ",
    band_id: 3
    },
    {title: "Looking for Drummer",
    description: "today, right now, fill in",
    instruments: "drums",
    band_id: 2
    },
    {title: "FIll in on the sax",
    description: "wedding in august, email for details---jazz",
    instruments: "brass",
    band_id: 1
    },
    {title: "FIll in on the flute",
    description: "come through for audition in august, email for details---jazz",
    instruments: "flute",
    band_id: 1
    },
    {title: "New STRINGS Player",
    description: "Need someone to fill in sept 20th at the crocodile 4PM",
    instruments: "voice ",
    band_id: 2
    } 
]

listings = [{
    name: 'Hanna',
    username: 'hannaengel',
    email: 'hengel@gmail.com',
    image_url: 'https://sa.kapamilya.com/absnews/abscbnnews/media/2018/tvpatrol/02/27/kz.jpg',
    bio: 'I love music gurlllll!',
    soundcloud: '<iframe width="100%" height="300" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/users/365733104&color=%2326eb1f&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe>',
    instruments : 'voice',
    genre: 'pop',
    facebook: 'https://www.facebook.com/hanna.engel.92?ref=bookmarks',
    instagram: 'https://www.instagram.com/hannakahh/?hl=en',
    spotify: '<iframe src="https://open.spotify.com/embed/artist/6LuN9FCkKOj5PcnpouEgny" width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>'        
},
{
    name: 'Leah',
    username: 'leahengel',
    email: 'hengel@gmail.com',
    image_url: 'https://www.billboard.com/files/styles/article_main_image/public/media/Rayvon-Owen-2017-billboard-1548.jpg',
    bio: 'I love music gurlllll!',
    soundcloud: '<iframe width="100%" height="300" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/users/365733104&color=%2326eb1f&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe>',
    instruments : 'voice',
    genre: 'pop',
    facebook: 'https://www.facebook.com/hanna.engel.92?ref=bookmarks',
    instagram: 'https://www.instagram.com/hannakahh/?hl=en',
    spotify: '<iframe src="https://open.spotify.com/embed/artist/6LuN9FCkKOj5PcnpouEgny" width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>'        
},
{
    name: 'Monkey',
    username: 'monkeyengel',
    email: 'hengel@gmail.com',
    image_url: 'https://www.liveabout.com/thmb/nKfdQ82K9xQi7sqmHHE_udp_jLQ=/768x0/filters:no_upscale():max_bytes(150000):strip_icc()/one-voice--somos-live--a-concert-for-disaster-relief---los-angeles-861409954-59f0cf876f53ba001113dfb9.jpg',
    bio: 'I love music gurlllll!',
    soundcloud: '<iframe width="100%" height="300" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/users/365733104&color=%2326eb1f&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe>',
    instruments : 'voice',
    genre: 'pop',
    facebook: 'https://www.facebook.com/hanna.engel.92?ref=bookmarks',
    instagram: 'https://www.instagram.com/hannakahh/?hl=en',
    spotify: '<iframe src="https://open.spotify.com/embed/artist/6LuN9FCkKOj5PcnpouEgny" width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>'        
}]





bands.each do |band|
    Band.create(band)
end

listings.each do |listing|
    Listing.create(listing)
end


musicians.each do |musician|
    Musician.create(musician)
end