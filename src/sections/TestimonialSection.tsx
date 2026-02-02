import SectionTitle from "../components/SectionTitle";
import TestimonialCard from "../components/TestimonialCard";
import type { ITestimonial } from "../types";
import Marquee from "react-fast-marquee";
import { useTranslation } from "react-i18next";
import { getTestimonialsData } from "../data/testimonial";

export default function TestimonialSection() {
  const { t } = useTranslation();

  const testimonialsData: ITestimonial[] = getTestimonialsData(t);

  return (
    <div id="testimonials" className="px-4 md:px-16 lg:px-24 xl:px-32">
      <SectionTitle
        text1={t("testimonials.sectionTitle.text1")}
        text2={t("testimonials.sectionTitle.text2")}
        text3={t("testimonials.sectionTitle.text3")}
      />

      <Marquee
        className="max-w-5xl mx-auto mt-11"
        gradient={true}
        speed={25}
        gradientColor="#000"
      >
        <div className="flex items-center justify-center py-5 overflow-hidden">
          {[...testimonialsData, ...testimonialsData].map(
            (testimonial: ITestimonial, index: number) => (
              <TestimonialCard
                key={index}
                index={index}
                testimonial={testimonial}
              />
            ),
          )}
        </div>
      </Marquee>

      <Marquee
        className="max-w-5xl mx-auto"
        gradient={true}
        speed={25}
        direction="right"
        gradientColor="#000"
      >
        <div className="flex items-center justify-center py-5 overflow-hidden">
          {[...testimonialsData, ...testimonialsData].map(
            (testimonial: ITestimonial, index: number) => (
              <TestimonialCard
                key={index}
                index={index}
                testimonial={testimonial}
              />
            ),
          )}
        </div>
      </Marquee>
    </div>
  );
}
