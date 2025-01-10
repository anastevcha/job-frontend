import React from "react";
import { Button } from "./ui/button";
import { Search } from "lucide-react";

const HeroSection = () => {
    return (
        <div className="text-center">
            <div className="flex flex-col gap-5 my-10">
                <span className="mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium">Намбер 1 джоб хант вебсайт</span>
                <h1 className="text-5xl font-bold">Находите, откликайтесь & <br /> устраивайтесь на <span className="text-[#6A38C2]">работу мечты</span> </h1>
                <p>
                    что то длинное и рандомное что то длинное и рандомное что то длинное и рандомное что то длинное и рандомное
                </p>
                <div className="flex w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto">
                    <input
                        type="text"
                        placeholder="Находите работу мечты"
                        className="outline-none border-none w-full"
                    />
                    <Button className="rounded-r-full bg-[#6A38C2]">
                        <Search className="h-5 w-5" />
                    </Button>
                </div>
            </div>
        </div>
    )
}
export default HeroSection