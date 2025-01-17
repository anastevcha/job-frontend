import React from "react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";

const filterData = [
    {
        filterType: "Местоположение",
        array: ["Москва", "Санкт-Петербуг", "Новосибирск", "Казань", "Екатеринбург"]
    },
    {
        filterType: "Отрасль",
        array: ["Фронтенд-разработчик", "Бэкенд-разработчик", "Fullstack-разработчик"]
    },
    {
        filterType: "Заработная плата",
        array: ["0-40k", "42-80k", "82-120k"]
    },
]

const FilterCard = () => {
    return (
        <div className="w-full bg-white p-3 rounded-md">
            <h1 className="font-bold text-lg">Фильтрация вакансий</h1>
            <hr className="mt-3" />
            <RadioGroup>
                {
                    filterData.map((data, index) => (
                        <div>
                            <h1 className="font-bold text-lg">{data.filterType}</h1>
                            {
                                data.array.map((item, index) => {
                                    return (
                                        <div className="flex items-center space-x-2 my-2">
                                            <RadioGroupItem value={item} />
                                            <Label>{item}</Label>
                                        </div>
                                    )
                                })
                            }

                        </div>
                    ))
                }
            </RadioGroup>
        </div>
    )
}

export default FilterCard