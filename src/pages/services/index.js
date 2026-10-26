import Link from "next/link";
import Head from "next/head";
import { FaArrowRight } from "react-icons/fa";
import { services } from "../../data/services";

export default function ServicesPage() {
  return (
    <>
      <Head>
        <title>Our Services | Luxury Dental Clinic</title>
      </Head>
      <section className="bg-white pt-32 pb-12 border-b border-main-color/10">
        <div className="container mx-auto px-6">
          <p className="eyebrow mb-4">Our Services</p>
          <h1 className="text-4xl md:text-5xl max-w-2xl text-main-color">
            Comprehensive Dental Care for <span className="serif-em">Every Smile</span>
          </h1>
        </div>
      </section>
      <section className="bg-cream py-16">
        <div className="container mx-auto px-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s) => (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow no-underline text-main-color"
            >
              <div className="h-52 overflow-hidden">
                <img
                  src={encodeURI(s.image)}
                  alt={s.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="p-6">
                <h2 className="text-2xl mb-2">{s.title}</h2>
                <p className="text-main-color/70 text-sm leading-relaxed">{s.summary}</p>
                <span className="inline-flex items-center gap-2 text-sm text-primary-color">
                  Learn more <FaArrowRight className="text-xs transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
