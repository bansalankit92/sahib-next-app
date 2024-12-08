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
        className=" text-center container my-10 mx-auto px-4 py-8 md:py-12 lg:py-16 xl:py-20 2xl:py-24 3xl:py-28 bg-white dark:bg-gray-900"
        id="books-section"
      >
        <div className="flex flex-col items-center justify-center w-full mb-8 md:mb-12 lg:mb-16 xl:mb-20 2xl:mb-24 3xl:mb-28">
          <h2 className="text-3xl font-bold text-center dark:text-white text-gray-800 md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl 3xl:text-8xl">
            Sahibji आरती 2
          </h2>
        </div>
       
        <div className="text-center">
          <MarkdownRenderer
            markdown={`
            




## Lyrics

_जय सतगुरु देवा, साहिब जय सतगुरु देवा।  
सब कुछ तुम पर अर्पण, करहूँ पद सेवा ॥  
                जय सतगुरु......._  

जय गुरुदेव दयानिधि, दीनन हितकारी, साहिब भक्तन हितकारी  
जय जय मोह विनाशक, जय जय तिमिर विनाशक, भव बंधनहारी।  
                जय सतगुरु.......  

ब्रह्मा विष्णु सदा शिव, गुरु मूरत धारी, साहिब प्रभु मूरत धारी  
वेद  पुराण बखानत, शास्त्र पुराण बखानत, गुरु महिमा भारी।  
                जय सतगुरु.......  

जप तप तीर्थ संयम, दान विविध दीन्हें, साहिब, दान विविध/बहुत दीन्हें    
गुरु बिन ज्ञान न होवे, दाता बिन ज्ञान न होवे, कोटि यत्न कीन्हें।  
जय सतगुरु.......  

माया मोह नदी जल, जीव बहे सारे, साहिब जीव बहे सारे  
नाम जहाज बिठाकर, शब्द जहाज चढ़ाकार, गुरु  पल में तारे।  
जय सतगुरु.......  

काम, क्रोध, मद, लोभ, चोर बड़े भारे, साहिब चोर  बड़े/बहुत भारे,  
ज्ञान खड़ग दे कर में, शब्द खड़ग दे कर में, गुर सब संहारे।  
जय सतगुरु.......  

नाना पंथ जगत में, निज-निज गुण गावें, साहिब न्यारे न्यारे यश गावें,  
सब का सार बताकर, सच का भेद लखा कर, गुरु मार्ग लावें।  
जय सतगुरु.......  

गुरु चरणामृत निर्मल, सब पातक हारी, साहिब सब दोषक हारी,  
वचन सुनत तम नासे,  शब्द सुनत भ्रम नासे, सब संशय टारी।  
जय सतगुरु.......


तन, मन धन सब अर्पण, गुरु चरणन कीजै, साहिब दाता अर्पण  कीजै,  
सदगुरु देव परमपद, सदगुरु देव अचलपद, मोक्ष गति लीजै।  
जय सतगुरु.......  

_जय सतगुरु देवा, साहिब जय सतगुरु देवा।  
सब कुछ तुम पर अर्पण, करहूँ पद सेवा ॥_  
                `}
          />
        </div>
        <div>
          <h3>Video</h3>

          <iframe
            width="100%"
            height="424"
            src="https://www.youtube.com/embed/osd_10IoXew"
            title='Aarti Video "JAI SATGURU DEVAA"  - Sung by Satguru Sahibji'
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
        </div>
      </section>
    </Suspense>
  );
};

export default BooksSection;
