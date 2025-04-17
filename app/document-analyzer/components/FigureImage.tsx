import { useState } from "react";
import { InitialStep } from "./InitialStep";
import { DigitalTwinCreator } from "./DigitalTwinCreator";
import { Modal } from "../../../components/Modal";

export function FigureImage({ plotImgBase64 }: { plotImgBase64: string, imgId: string }) {
    const [isModalOpen, setIsModalOpen] = useState(false)

    const handleStartSelection = () => {
        setIsModalOpen(true)
    }

    return (
        <div className="relative">
            <span className="flex justify-center my-4 test-123 max-w-full h-auto m-0">
                <span className="relative m-0">
                    <InitialStep onStartSelection={handleStartSelection} />
                    <img 
                        src={plotImgBase64} 
                        alt={'Plot'} 
                        className="max-w-full h-auto m-0" 
                    />
                </span>
            </span>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <DigitalTwinCreator imageSrc={plotImgBase64} />
            </Modal>
        </div>
    )
}