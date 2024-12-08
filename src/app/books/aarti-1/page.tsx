"use client";

import React, { Suspense, useEffect, useState } from "react";
import { marked } from "marked";
import { useSearchParams } from "next/navigation";
import MarkdownRenderer from "@/components/MarkdownRenderer";

interface PlayerProps {}

const BooksSection: React.FC<PlayerProps> = ({}) => {
  return (
    <Suspense>
      <section
        className="text-center container my-10 mx-auto px-4 py-8 md:py-12 lg:py-16 xl:py-20 2xl:py-24 3xl:py-28 bg-white dark:bg-gray-900"
        id="books-section"
      >
        <div className="flex flex-col items-center justify-center w-full mb-8 md:mb-12 lg:mb-16 xl:mb-20 2xl:mb-24 3xl:mb-28">
          <h2 className="text-3xl font-bold text-center dark:text-white text-gray-800 md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl 3xl:text-8xl">
            Sahibji आरती 1
          </h2>
        </div>
        
        <div className="text-center">
          <MarkdownRenderer
            markdown={`
            

           

            
## Lyrics
            
            
            आरती करहूँ संत सतगुरु की, सतगुरु सत्यनाम दिनकर की।  
            
            
            काम, क्रोध, मद, लोभ नसावन, मोह ग्रसित करि सुरसरी पावन।  
            हरहिं पाप कलिमल की, आरती करहूँ संत सदगुरु की ॥  
            
            तुम पारस संगति पारस हो, कलिमल ग्रसित लौह प्राणी भव।  
            कंचन करहिं सुधर की , आरती करहूँ संत सतगुरु की॥  
            
            भूलेहूँ जो जिव संगति आवें, कर्म भ्रम तेहि बाँध न पावें।  
            भय न रहे यम/जम घर की , आरती करहूँ संत सतगुरु की॥  
            
            योग अग्नि  प्रगटहिं तिन के घट, गगन चढ़े सुरति खुले वज्रपट।   
            दर्शन हों हरिहर की, आरती करहूँ संत सतगुरु की॥  
            
            सहस्त्र कँवल चढ़ि त्रिकुटी आवें, शून्य शिखर चढ़ि बीन बजावें।  
            खुले द्वार सतघर की, आरती करहूँ संत सतगुरु की॥  
            
            अलख अगम का दर्शन पावें, पुरुष अनामी में जावे  समावें।  
            सदगुरु देव अमर की, आरती करहूँ संत सतगुरु की॥  
            
            एक आस विश्वास तुम्हारी, पड़ा द्वार मैं सब विधि में हारी ।  
            जय, जय, जय गुरुवर की, आरती करहूँ संत सतगुरु की॥  

            -----

            कक्का केवल नाम है, बब्बा वरण शरीर। 
            ररा सब में रम रहा, जिसका नाम कबीर ॥
                
                `}
          />
        </div>
        <div>
          <h3>Video</h3>

          <iframe
            width="100%"
            height="424"
            src="https://www.youtube.com/embed/QG_PDj58ON4"
            title='AUDIO "AARTI KAROON HOON SANT SATGURU KI"'
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          ></iframe>
        </div>
      </section>
    </Suspense>
  );
};

export default BooksSection;
