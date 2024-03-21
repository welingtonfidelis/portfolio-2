import { Modal, Carousel } from "antd";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";

interface Props {
  title: string;
  images: string[];
  isVisible: boolean;
  onClose: (item: any) => void;
}

export const CarouselImage: React.FC<Props> = (props) => {
  
  const SlickArrowLeft = ({ currentSlide, slideCount, ...props }: any) => (
    <FaChevronLeft
      {...props}
      className={
        "slick-prev slick-arrow" +
        (currentSlide === 0 ? " slick-disabled" : "")
      }
      aria-hidden="true"
      aria-disabled={currentSlide === 0 ? true : false}
      type="button"
    >
    </FaChevronLeft>
  );
  const SlickArrowRight = ({ currentSlide, slideCount, ...props }: any) => (
    <FaChevronRight
      {...props}
      className={
        "slick-next slick-arrow" +
        (currentSlide === slideCount - 1 ? " slick-disabled" : "")
      }
      aria-hidden="true"
      aria-disabled={currentSlide === slideCount - 1 ? true : false}
      type="button"
    >
    </FaChevronRight>
  );

  return (
    <Modal
      centered
      open={props.isVisible}
      cancelButtonProps={{ hidden: true }}
      okButtonProps={{ hidden: true }}
      footer={false}
      onCancel={props.onClose}
    >
      <div id="carousel-image">
        <h2>{props.title}</h2>

        <main>
          <Carousel
            arrows={true}
            prevArrow={<SlickArrowLeft />}
            nextArrow={<SlickArrowRight />}
          >
            {props.images.map((item, index) => (
              <img src={item} alt={props.title + "_image_" + index} key={index}/>
            ))}
          </Carousel>
        </main>
      </div>
    </Modal>
  );
};
