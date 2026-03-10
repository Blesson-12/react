import React from 'react'
import { motion as Motion } from 'framer-motion'

const About = () => {
  return (
    <>
      <section className="about container text-light pt-1 pb-5">
        <div className="text-center mb-4">
          <Motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            ABOUT US
          </Motion.h2>
          <Motion.hr
            className="border section-divider w-25 mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.05 }}
          />
        </div>

        <Motion.div
          className="col-12 abouts glass-panel p-3 p-md-4"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45 }}
        >
          <h3 className="section-title fs-4">Success Academy - Where Learning Leads to Success</h3>
          <p>
            At <strong>Success Academy</strong>, we believe education is not just about grades -
            it is about <em>growth, confidence, and discovering potential</em>. Founded in
            <strong> Coimbatore, Kinathukadavu</strong>, our mission is to empower every learner
            with the skills and mindset needed to excel in both academics and life.
          </p>
          <p>
            We offer a range of courses - from <strong>Spoken English</strong> and
            <strong> Handwriting Improvement</strong> to <strong>Programming Languages</strong> like
            Python, C/C++, and Java. Each course combines theory with practical application,
            ensuring students gain hands-on experience and real-world knowledge.
          </p>
        </Motion.div>

        <div className="row mt-5 g-4">
          <div className="col-md-4">
            <Motion.div
              className="card glass-panel text-light h-100"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.35 }}
            >
              <div className="card-body">
                <h5 className="card-title section-title">Our Vision</h5>
                <p className="card-text">
                  To become a center of excellence in education, nurturing young minds to be
                  confident communicators, creative thinkers, and capable leaders.
                </p>
              </div>
            </Motion.div>
          </div>

          <div className="col-md-4">
            <Motion.div
              className="card glass-panel text-light h-100"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.35, delay: 0.08 }}
            >
              <div className="card-body">
                <h5 className="card-title section-title">Our Mission</h5>
                <ul className="card-text">
                  <li>Provide quality education through innovative methods.</li>
                  <li>Help students discover and develop their unique strengths.</li>
                  <li>Create a supportive and inspiring learning environment.</li>
                </ul>
              </div>
            </Motion.div>
          </div>

          <div className="col-md-4">
            <Motion.div
              className="card glass-panel text-light h-100"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.35, delay: 0.16 }}
            >
              <div className="card-body">
                <h5 className="card-title section-title">Why Choose Us?</h5>
                <ul className="card-text">
                  <li>Qualified and passionate faculty</li>
                  <li>Student-centered teaching</li>
                  <li>Well-structured, updated curriculum</li>
                  <li>Focus on both academic and personal development</li>
                </ul>
              </div>
            </Motion.div>
          </div>
        </div>
      </section>
    </>
  )
}

export default About

