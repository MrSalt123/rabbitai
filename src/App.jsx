import React, { useState, useRef, useEffect } from 'react';
import Typewriter from './Typewriter';
import './App.css';

function App() {
  const [showTerminal, setShowTerminal] = useState(false);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [rabbitClicked, setRabbitClicked] = useState(false);

  // Bunny animation frames
  const frames = [
    `                   
              
        
        

                                       @t/@                                  
                                 @GG%@ @t//@                                 
                                @GGGG% @t(/@                                 
                                @GOOG~@tt((@                                 
                                @GOOG~@^tt@                                  
                                @GOGG~@^tt@                                  
                    @@OOOOOC@@@ @~G~tt@^^^@                                  
                  @OOO////     GOOtt(C@t  s@                                 
                 @OOO/////     GO((((OOO   s@                                
               @OOO(OO//       G(((@@@(OO   s@                               
               @OOO/OO/        G(((@@@@(OGGGG@                               
              @O(tO//(/        GO(((@@@(OGGGG@                               
            @(@((tO///(        GGO((((((   GG@                               
            @(@^(%tt%//(         GGO((O  OOO@                                
             @@^((ttt%/t(         GGGGG   ~ @                                
               @%%%((((((            %%@                                     
                @%%%%%%((((@@@@@    %%  @                                    
                 @%%%%%%%%ss  @ @     t  @                                   
                 @@@@@@@@@@@@@@@  @@@@@@                                     
                                                 
    `,
    `                             
                                                                                
                                                                             
                                        @t/@                                 
                                   @@@  @t//@                                
                                 @GGGG% @t(/@                                
                                 @GOOG~@tt((@                                
                                 @OOOO~@tt(@                                 
                                 @GOGG~@^tt@                                 
                                 @~G~tt@^^^@                                 
                       @@@@@@   @@t~tt%@^^/s@                                
                    @OO///(O    GO((((OOO   s@                               
                  @OOO/////     G(((@@@(OO   s@                              
                 @OOOOO///      G(((@@ @(O  Gs@                              
                @OOO/O///       GO(((@@@(OGGGG@                              
               @O(tO//(/        GGO((((((   GG@                              
              @@((tO//((         GGO((((   G  @                              
             @(@((tOt//((          GGGGG   ~ @                               
             @^@^((ttt%/t(            %%@                                    
              @@^((((tt%%(          ~%  @                                    
                @%%((%((((@@@@@@@@     t @                                   
                 @%%%(%%@@@        @@  @ @                                   
                 @%%%%%%%ss@@@       @@ @                                    
                    @@@@@@@@@@                                               
                                                                  
    `,
    `
                                                                                 
                                                        @@                   
                                                  @@@  @t//@                 
                                                 @GG%@ @t//@                 
                                                @GOGG%@@t(/@                 
                                  @@@@          @OOOO~@tt(@                  
                                 @OOOO@@@@      @GOOG~@^tt@                  
                               @OOO/O///(O  @   @~OG~t@^^t@                  
                             @OOO(OOO////     @@@t~tt%@^^/s@                 
                             @OOO/O/O///       GOOtt(C@t  s@                 
                            @O(tO//O///        G(((((((O   s@                
                          @(@((tO/////         G((((@@((O  Gs@               
                          @(@((tOt///(         G(((((@@(OGGGG@               
                           @@^((ttt%t((        GO((((((((GGGG@               
                             @%%((((t/t(        GGO((((   G  @               
                             @%%((%((%%(         GGO((O  OOO@                
                              @%%%%%@@@@@@@@@         %s@@@@                 
                              @@%@%%@         @    ~%  @                     
                              @@%@%@           @    %%  @                    
                              @  @               @     @@@                   
                                                                             
                                                                             
                                                                             
       
    `,
    `
                 
    
                                                                             
                                                                             
                                                             #(O#            
                                                       @  t@ #(OO#           
                                                      @    t @(/O#           
                                       ##@@@          @ OO ^@((//#           
                                     #OOOOOOOOO~#     @ OO ^@%((#            
                                    #OOOOOOOO/O  @    @ O  ^@%((#            
                                  #OOO/OOOOOOO      @ @^ ^((@%%%#            
                                  #OOOOOOOOO          OO((/~@(  ^#           
                                 #O/(OOOOOOO          O////OOO   ^#          
                              @O@#//(OOOOOO           ///@@@/OO   ^@         
                              @%/#%/t((tOO/           ///@@@@/O    @         
                               @%#%//(((t(//          O///@@@/O    @         
                                  #tt////(O(/          O//////     @         
                                   @t///tt%/@@@@@@O      O//O  OOO#          
                                   @ttttt@@@      @             ^ #          
                                   @%t@tt@          @      tt#               
                                   @  @@              @   tt  #              
                                   @  @                @    (  #             
                                                        ######               
                                       
    `,
    `
                                                                              
                                                                             
                                                                             
                                                                             
                                                                  @@         
                                                            @@@  @t//@       
                                                           @GG%@ @t//@       
                                                          @GOGG%@@t(/@       
                                                          @OOOO~@tt(@        
                                                          @GOOG~@^tt@        
                                                @@@@@@    @~OG~t@^^t@        
                                             @OO///(O    @@t~tt%@^^/s@       
                                            @OOO////     GOOtt(C@t  s@       
                                          @OOOOO///      G(((((((O   s@      
                                         @OOO/O///       G(((@@ @(O  Gs@     
                                         @OOO/OO/        G(((@@@@(OGGGG@     
                                       @@((tO//((        GO((((((((GGGG@     
                                      @/@((tOt//((        GGO((((   G  @     
                                      @/@^(%tt%//(         GGO((O  OOO@      
                                        @^((((tt%%(             %s@@@@       
                                         @%%%%%(((((         ~%  @           
                                          @%%%%%%((((@@@@@    %%  @          
                                           @sssssssss    @ @     @@@         
                                     
    `,
    `
                                                                                                        
                                                                                                       
                                                                  @t/@                                 
                                                             @@@  @t//@                                
                                                           @GGGG% @t(/@                                
                                                           @GOOG~@tt((@                                
                                                           @OOOO~@tt(@                                 
                                                           @GOGG~@^tt@                                 
                                                           @~G~tt@^^^@                                 
                                                 @@@@@@   @@t~tt%@^^/s@                                
                                              @OO///(O    GO((((OOO   s@                               
                                            @OOO/////     G(((@@@(OO   s@                              
                                           @OOOOO///      G(((@@ @(O  Gs@                              
                                          @OOO/O///       GO(((@@@(OGGGG@                              
                                         @O(tO//(/        GGO((((((   GG@                              
                                        @@((tO//((         GGO((((   G  @                              
                                       @(@((tOt//((          GGGGG   ~ @                               
                                       @^@^((ttt%/t(            %%@                                    
                                        @@^((((tt%%(          ~%  @                                    
                                          @%%((%((((@@@@@@@@     t @                                   
                                           @%%%(%%@@@        @@  @ @                                   
                                           @%%%%%%%ss@@@       @@ @                                    
                                              @@@@@@@@@@                                               
               
    `,
    `
                                                                                                           
                                                                                  @@                   
                                                                            @@@  @t//@                 
                                                                           @GG%@ @t//@                 
                                                                          @GOGG%@@t(/@                 
                                                            @@@@          @OOOO~@tt(@                  
                                                           @OOOO@@@@      @GOOG~@^tt@                  
                                                         @OOO/O///(O  @   @~OG~t@^^t@                  
                                                       @OOO(OOO////     @@@t~tt%@^^/s@                 
                                                       @OOO/O/O///       GOOtt(C@t  s@                 
                                                      @O(tO//O///        G(((((((O   s@                
                                                    @(@((tO/////         G((((@@((O  Gs@               
                                                    @(@((tOt///(         G(((((@@(OGGGG@               
                                                     @@^((ttt%t((        GO((((((((GGGG@               
                                                       @%%((((t/t(        GGO((((   G  @               
                                                       @%%((%((%%(         GGO((O  OOO@                
                                                        @%%%%%@@@@@@@@@         %s@@@@                 
                                                        @@%@%%@         @    ~%  @                     
                                                        @@%@%@           @    %%  @                    
                                                        @  @               @     @@@                   
                                                                                                       
                                                                                                       
                                                                                                       
                           
    `,
    `
                                                                                                           
                                                                                                       
                                                                                                       
                                                                                                       
                                                                                       #(O#            
                                                                                 @  t@ #(OO#           
                                                                                @    t @(/O#           
                                                                 ##@@@          @ OO ^@((//#           
                                                               #OOOOOOOOO~#     @ OO ^@%((#            
                                                              #OOOOOOOO/O  @    @ O  ^@%((#            
                                                            #OOO/OOOOOOO      @ @^ ^((@%%%#            
                                                            #OOOOOOOOO          OO((/~@(  ^#           
                                                           #O/(OOOOOOO          O////OOO   ^#          
                                                        @O@#//(OOOOOO           ///@@@/OO   ^@         
                                                        @%/#%/t((tOO/           ///@@@@/O    @         
                                                         @%#%//(((t(//          O///@@@/O    @         
                                                            #tt////(O(/          O//////     @         
                                                             @t///tt%/@@@@@@O      O//O  OOO#          
                                                             @ttttt@@@      @             ^ #          
                                                             @%t@tt@          @      tt#               
                                                             @  @@              @   tt  #              
                                                             @  @                @    (  #             
                                                                                  ######               
          
    `,
    `
                                                                                                           
                                                                                                       
                                                                                                       
                                                                                                       
                                                                                            @@         
                                                                                      @@@  @t//@       
                                                                                     @GG%@ @t//@       
                                                                                    @GOGG%@@t(/@       
                                                                                    @OOOO~@tt(@        
                                                                                    @GOOG~@^tt@        
                                                                          @@@@@@    @~OG~t@^^t@        
                                                                       @OO///(O    @@t~tt%@^^/s@       
                                                                      @OOO////     GOOtt(C@t  s@       
                                                                    @OOOOO///      G(((((((O   s@      
                                                                   @OOO/O///       G(((@@ @(O  Gs@     
                                                                   @OOO/OO/        G(((@@@@(OGGGG@     
                                                                 @@((tO//((        GO((((((((GGGG@     
                                                                @/@((tOt//((        GGO((((   G  @     
                                                                @/@^(%tt%//(         GGO((O  OOO@      
                                                                  @^((((tt%%(             %s@@@@       
                                                                   @%%%%%(((((         ~%  @           
                                                                    @%%%%%%((((@@@@@    %%  @          
                                                                     @sssssssss    @ @     @@@         
            
    `,
    `
                                                                                                                                     
                                                                                                                                 
                                                                                            @t/@                                 
                                                                                       @@@  @t//@                                
                                                                                     @GGGG% @t(/@                                
                                                                                     @GOOG~@tt((@                                
                                                                                     @OOOO~@tt(@                                 
                                                                                     @GOGG~@^tt@                                 
                                                                                     @~G~tt@^^^@                                 
                                                                           @@@@@@   @@t~tt%@^^/s@                                
                                                                        @OO///(O    GO((((OOO   s@                               
                                                                      @OOO/////     G(((@@@(OO   s@                              
                                                                     @OOOOO///      G(((@@ @(O  Gs@                              
                                                                    @OOO/O///       GO(((@@@(OGGGG@                              
                                                                   @O(tO//(/        GGO((((((   GG@                              
                                                                  @@((tO//((         GGO((((   G  @                              
                                                                 @(@((tOt//((          GGGGG   ~ @                               
                                                                 @^@^((ttt%/t(            %%@                                    
                                                                  @@^((((tt%%(          ~%  @                                    
                                                                    @%%((%((((@@@@@@@@     t @                                   
                                                                     @%%%(%%@@@        @@  @ @                                   
                                                                     @%%%%%%%ss@@@       @@ @                                    
                                                                        @@@@@@@@@@                                               
              
    `,
    `
                                                                                                                                     
                                                                                                            @@                   
                                                                                                      @@@  @t//@                 
                                                                                                     @GG%@ @t//@                 
                                                                                                    @GOGG%@@t(/@                 
                                                                                      @@@@          @OOOO~@tt(@                  
                                                                                     @OOOO@@@@      @GOOG~@^tt@                  
                                                                                   @OOO/O///(O  @   @~OG~t@^^t@                  
                                                                                 @OOO(OOO////     @@@t~tt%@^^/s@                 
                                                                                 @OOO/O/O///       GOOtt(C@t  s@                 
                                                                                @O(tO//O///        G(((((((O   s@                
                                                                              @(@((tO/////         G((((@@((O  Gs@               
                                                                              @(@((tOt///(         G(((((@@(OGGGG@               
                                                                               @@^((ttt%t((        GO((((((((GGGG@               
                                                                                 @%%((((t/t(        GGO((((   G  @               
                                                                                 @%%((%((%%(         GGO((O  OOO@                
                                                                                  @%%%%%@@@@@@@@@         %s@@@@                 
                                                                                  @@%@%%@         @    ~%  @                     
                                                                                  @@%@%@           @    %%  @                    
                                                                                  @  @               @     @@@                   
                                                                                                                                 
                                                                                                                                 
                                                                                                                                 
              
    `,
    `
                                                                                                                                     
                                                                                                                                 
                                                                                                                                 
                                                                                                                                 
                                                                                                                 #(O#            
                                                                                                           @  t@ #(OO#           
                                                                                                          @    t @(/O#           
                                                                                           ##@@@          @ OO ^@((//#           
                                                                                         #OOOOOOOOO~#     @ OO ^@%((#            
                                                                                        #OOOOOOOO/O  @    @ O  ^@%((#            
                                                                                      #OOO/OOOOOOO      @ @^ ^((@%%%#            
                                                                                      #OOOOOOOOO          OO((/~@(  ^#           
                                                                                     #O/(OOOOOOO          O////OOO   ^#          
                                                                                  @O@#//(OOOOOO           ///@@@/OO   ^@         
                                                                                  @%/#%/t((tOO/           ///@@@@/O    @         
                                                                                   @%#%//(((t(//          O///@@@/O    @         
                                                                                      #tt////(O(/          O//////     @         
                                                                                       @t///tt%/@@@@@@O      O//O  OOO#          
                                                                                       @ttttt@@@      @             ^ #          
                                                                                       @%t@tt@          @      tt#               
                                                                                       @  @@              @   tt  #              
                                                                                       @  @                @    (  #             
                                                                                                            ######               
            
    `,
    `
                                                                                                                                     
                                                                                                                                 
                                                                                                                                 
                                                                                                                                 
                                                                                                                      @@         
                                                                                                                @@@  @t//@       
                                                                                                               @GG%@ @t//@       
                                                                                                              @GOGG%@@t(/@       
                                                                                                              @OOOO~@tt(@        
                                                                                                              @GOOG~@^tt@        
                                                                                                    @@@@@@    @~OG~t@^^t@        
                                                                                                 @OO///(O    @@t~tt%@^^/s@       
                                                                                                @OOO////     GOOtt(C@t  s@       
                                                                                              @OOOOO///      G(((((((O   s@      
                                                                                             @OOO/O///       G(((@@ @(O  Gs@     
                                                                                             @OOO/OO/        G(((@@@@(OGGGG@     
                                                                                           @@((tO//((        GO((((((((GGGG@     
                                                                                          @/@((tOt//((        GGO((((   G  @     
                                                                                          @/@^(%tt%//(         GGO((O  OOO@      
                                                                                            @^((((tt%%(             %s@@@@       
                                                                                             @%%%%%(((((         ~%  @           
                                                                                              @%%%%%%((((@@@@@    %%  @          
                                                                                               @sssssssss    @ @     @@@         
           
    `,
    `
                                                                                                                                     
                                                                                                                                 
                                                                                                                     @t/@                                 
                                                                                                                @@@  @t//@                                
                                                                                                              @GGGG% @t(/@                                
                                                                                                              @GOOG~@tt((@                                
                                                                                                              @OOOO~@tt(@                                 
                                                                                                              @GOGG~@^tt@                                 
                                                                                                              @~G~tt@^^^@                                 
                                                                                                    @@@@@@   @@t~tt%@^^/s@                                
                                                                                                 @OO///(O    GO((((OOO   s@                               
                                                                                               @OOO/////     G(((@@@(OO   s@                              
                                                                                              @OOOOO///      G(((@@ @(O  Gs@                              
                                                                                             @OOO/O///       GO(((@@@(OGGGG@                              
                                                                                            @O(tO//(/        GGO((((((   GG@                              
                                                                                           @@((tO//((         GGO((((   G  @                              
                                                                                          @(@((tOt//((          GGGGG   ~ @                               
                                                                                          @^@^((ttt%/t(            %%@                                    
                                                                                           @@^((((tt%%(          ~%  @                                    
                                                                                             @%%((%((((@@@@@@@@     t @                                   
                                                                                              @%%%(%%@@@        @@  @ @                                   
                                                                                              @%%%%%%%ss@@@       @@ @                                    
                                                                                                 @@@@@@@@@@                                               
                                                                                               
    `,
    `
                                                                                                                                                              
                                                                                                                                     @@                   
                                                                                                                               @@@  @t//@                 
                                                                                                                              @GG%@ @t//@                 
                                                                                                                             @GOGG%@@t(/@                 
                                                                                                               @@@@          @OOOO~@tt(@                  
                                                                                                              @OOOO@@@@      @GOOG~@^tt@                  
                                                                                                            @OOO/O///(O  @   @~OG~t@^^t@                  
                                                                                                          @OOO(OOO////     @@@t~tt%@^^/s@                 
                                                                                                          @OOO/O/O///       GOOtt(C@t  s@                 
                                                                                                         @O(tO//O///        G(((((((O   s@                
                                                                                                       @(@((tO/////         G((((@@((O  Gs@               
                                                                                                       @(@((tOt///(         G(((((@@(OGGGG@               
                                                                                                        @@^((ttt%t((        GO((((((((GGGG@               
                                                                                                          @%%((((t/t(        GGO((((   G  @               
                                                                                                          @%%((%((%%(         GGO((O  OOO@                
                                                                                                           @%%%%%@@@@@@@@@         %s@@@@                 
                                                                                                           @@%@%%@         @    ~%  @                     
                                                                                                           @@%@%@           @    %%  @                    
                                                                                                           @  @               @     @@@                   
                                                                                                                                                          
                                                                                                                                                          
                                                                                                                                                          
                                                                                                     
    `,
    `
                                                                                                                                                              
                                                                                                                                                          
                                                                                                                                                          
                                                                                                                                                          
                                                                                                                                          #(O#            
                                                                                                                                    @  t@ #(OO#           
                                                                                                                                   @    t @(/O#           
                                                                                                                    ##@@@          @ OO ^@((//#           
                                                                                                                  #OOOOOOOOO~#     @ OO ^@%((#            
                                                                                                                 #OOOOOOOO/O  @    @ O  ^@%((#            
                                                                                                               #OOO/OOOOOOO      @ @^ ^((@%%%#            
                                                                                                               #OOOOOOOOO          OO((/~@(  ^#           
                                                                                                              #O/(OOOOOOO          O////OOO   ^#          
                                                                                                           @O@#//(OOOOOO           ///@@@/OO   ^@         
                                                                                                           @%/#%/t((tOO/           ///@@@@/O    @         
                                                                                                            @%#%//(((t(//          O///@@@/O    @         
                                                                                                               #tt////(O(/          O//////     @         
                                                                                                                @t///tt%/@@@@@@O      O//O  OOO#          
                                                                                                                @ttttt@@@      @             ^ #          
                                                                                                                @%t@tt@          @      tt#               
                                                                                                                @  @@              @   tt  #              
                                                                                                                @  @                @    (  #             
                                                                                                                                     ######               
              
    `,
    `
                                                                                                                                                              
                                                                                                                                                          
                                                                                                                                                          
                                                                                                                                                          
                                                                                                                                               @@         
                                                                                                                                         @@@  @t//@       
                                                                                                                                        @GG%@ @t//@       
                                                                                                                                       @GOGG%@@t(/@       
                                                                                                                                       @OOOO~@tt(@        
                                                                                                                                       @GOOG~@^tt@        
                                                                                                                             @@@@@@    @~OG~t@^^t@        
                                                                                                                          @OO///(O    @@t~tt%@^^/s@       
                                                                                                                         @OOO////     GOOtt(C@t  s@       
                                                                                                                       @OOOOO///      G(((((((O   s@      
                                                                                                                      @OOO/O///       G(((@@ @(O  Gs@     
                                                                                                                      @OOO/OO/        G(((@@@@(OGGGG@     
                                                                                                                    @@((tO//((        GO((((((((GGGG@     
                                                                                                                   @/@((tOt//((        GGO((((   G  @     
                                                                                                                   @/@^(%tt%//(         GGO((O  OOO@      
                                                                                                                     @^((((tt%%(             %s@@@@       
                                                                                                                      @%%%%%(((((         ~%  @           
                                                                                                                       @%%%%%%((((@@@@@    %%  @          
                                                                                                                        @sssssssss    @ @     @@@

                
    `,

  ];

  // Handles the "Dive In" button click
  const handleDive = () => {
    if (rabbitClicked) return;
    setRabbitClicked(true);
    let i = 0;
    const interval = setInterval(() => {
      setCurrentFrame(i);
      i++;
      if (i === frames.length + 1) {
        clearInterval(interval);
        setShowTerminal(true);
      }
    }, 200); // Adjust the speed of the animation
  };


  return (
    <div className="font-cascadia text-xs text-white bg-black h-screen flex">
      {!showTerminal ? (
        <div className='w-screen items-center justify-center'>
          <div className='flex flex-col items-center justify-center text-center h-1/5'>
            {/* Static content */}
            <Typewriter text="Yoou have stumbled upon the rabbit hole — a place where questions outnumber answers, and truths are hidden beneath layers of illusion. Will you venture deeper to uncover what lies beyond? Click on the rabbit to start." />
          </div>

          {/* Bunny animation */}
          <div className="bunny-container mt-8">
            <pre onClick={handleDive}>{frames[currentFrame]}</pre>
            <pre className="hole">{`
                                                                                                                    ⠀⠀⠀⠀⠀⠀⠀⠀⣀⣀⣠⣤⣤⣤⣤⣤⣤⣤⣤⣄⣀⣀⠀⠀⠀⠀⠀⠀⠀⠀
                                                                                                                    ⠀⠀⠀⢀⣤⣴⣾⣿⣿⡿⠿⠿⠿⠟⠛⠛⠻⠿⠿⠿⢿⣿⣿⣷⣦⣤⡀⠀⠀⠀
                                                                                                                    ⠀⢀⣼⣿⡿⠛⠉⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠉⠛⢿⣿⣧⡀⠀
                                                                                                                    ⠀⢸⡟⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⢻⡇⠀
                                                                                                                    ⠀⠈⢻⣦⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣴⡟⠁⠀
                                                                                                                    ⠀⠀⠀⠈⠛⠳⢦⣤⣄⣀⣀⡀⠀⠀⠀⠀⠀⠀⢀⣀⣀⣠⣤⡴⠞⠛⠁⠀⠀⠀
                                                                                                                    ⠀⠀⠀⠀⠀⠀⠀⠀⠈⠉⠙⠛⠛⠛⠛⠛⠛⠛⠛⠋⠉⠉⠀⠀⠀⠀
                  `}
            </pre>
          </div>
        </div>
      ) : (
        <Terminal />
      )}
    </div>
  );
}


function Terminal() {
  const [commands, setCommands] = useState([]);
  const [currentCommand, setCurrentCommand] = useState('');
  const [apiLoadingIndex, setApiLoadingIndex] = useState(null); // Tracks which command is loading

  const terminalEndRef = useRef(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [commands]);

  const handleInputChange = (e) => {
    setCurrentCommand(e.target.value);
  };

  const handleKeyDown = async (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (currentCommand.trim()) {
        const newCommand = { input: currentCommand, output: '' };
        const newCommands = [...commands, newCommand];
        setCommands(newCommands);
        setCurrentCommand('');

        // Start API call
        const commandIndex = newCommands.length - 1;
        setApiLoadingIndex(commandIndex);
        const response = await handleCommand(currentCommand);
        setApiLoadingIndex(null);

        // Update command output
        setCommands((prevCommands) =>
          prevCommands.map((cmd, index) =>
            index === commandIndex ? { ...cmd, output: response } : cmd
          )
        );
      }
    }
  };

  const handleCommand = async (command) => {
    if (command.startsWith('ask ')) {
      const query = command.slice(4).trim();
      if (query) {
        return await fetchOpenAIResponse(query);
      }
    } else if (command === '--help') {
      return 'Help Guide:\n  --help      Show this help guide\n  cls         Clear the screen\n  about       Display information about RabbitAI\n  ask [text]  Ask the AI a question';
    } else if (command === 'cls') {
      setCommands([]);
      return '';
    } else if (command === 'about') {
      return 'RabbitAI Terminal - Created by Conspirator Corporation';
    } else {
      return `'${command}' is not recognized as an internal or external command.`;
    }
  };

  const fetchOpenAIResponse = async (query) => {
    const apiKey = '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'; // Replace with your API key
    const url = 'https://api.openai.com/v1/chat/completions';

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content:
                'You are an expert in conspiracy theories. When asked about any conspiracy theory, always provide a detailed response that includes the following sections with this exact format: \n\n' +
                '[Description]\nProvide a detailed overview of the conspiracy theory.\n\n' +
                '[Claims]\nList key claims made by proponents of the theory in bullet points.\n\n' +
                '[Evidence]\nProvide supporting evidence for each claim, including references to studies, experts, or organizations that have advocated for the theory.\n\n' +
                '[Sources]\nProvide links to credible sources or studies that users can explore for more information. If no credible sources are available, do not include this section.' +
                'Do not use numbers to bullet point anything, you must use the format provided with.',
            },
            { role: 'user', content: query },
          ],
          max_tokens: 2000,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      return data.choices[0].message.content.trim();
    } catch (error) {
      console.error('Error fetching OpenAI response:', error);
      return 'Error: Unable to connect to the AI.';
    }
  };

  return (
    <div className="font-cascadia text-xs text-white bg-black p-4 h-screen overflow-y-auto">
      <p>RabbitAI Terminal</p>
      <p>Copyright (C) Conspirator Corporation. All rights reserved</p>
      <br />
      <p>Use --help for a help guide.</p>
      <p>Begin your dive into the rabbit hole...</p>
      <br />

      {/* Display the command history */}
      {commands.map((cmd, index) => (
        <div key={index}>
          <p>{`C:\\Users\\anonymousrabbit> ${cmd.input}`}</p>
          {apiLoadingIndex === index && <p className="ml-4 text-yellow-400">Thinking...</p>}
          {cmd.output && (
            <pre className="ml-4 text-gray-400 whitespace-pre-wrap">
              {cmd.output}
            </pre>
          )}
        </div>
      ))}

      <div ref={terminalEndRef} />

      {/* Input for typing commands */}
      <p className="flex items-center">
        <span className="text-white">{"C:\\Users\\anonymousrabbit>"}</span>
        <input
          type="text"
          className="bg-transparent text-white outline-none w-full ml-2"
          value={currentCommand}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          autoFocus
        />
      </p>
    </div>
  );
}

export default App;
