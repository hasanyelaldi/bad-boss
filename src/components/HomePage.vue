<template>
  <div class="homepage">
    <div class="content-container">
      <!-- Left Paragraph -->
      <div class="paragraph left-paragraph">
        <h2>Bad Boss application</h2>
        <p>
          A layoff application allows users to input their personal information and relevant skill points, which help categorize and assess their professional profile. By collecting these details, the app enables a comprehensive view of the workforce, making it easier for employers or administrators to understand the skill sets of each employee. This feature also helps in determining who might be essential for the organization and who might be considered for a layoff based on the inputted skill points.
        </p> 
        <p>
          When users wish to proceed with a layoff, they can navigate to a dedicated layoff page within the application. This page typically enables users to randomly select individuals for layoff, ensuring a fair and unbiased process. The random selection mechanism reduces the risk of discrimination or favoritism, making the process more transparent.
        </p>
        <button @click="navigateToUsers" class="add-button">Go to users</button>
      </div>

      <!-- Circle Image in the middle -->
      <div class="image-container">
        <img src="../assets/boss2.svg" alt="Circle Image" class="circle-image" />
      </div>

      <!-- Right Paragraph -->
      <div class="paragraph right-paragraph">
        <h2>Faced with a layoff</h2>
        <p>
          When faced with a layoff, the first thing to do is remain calm and gather all necessary information from your employer. Understand the reasons behind the layoff, whether it is due to company downsizing, financial challenges, or restructuring. Inquire about your severance package, benefits, and any assistance the company may offer in terms of career transition, such as job placement services or recommendations. It's important to clarify timelines and any legal rights you may have, such as unemployment benefits or other entitlements.
        </p> 
        <p>
          Afterward, take time to reassess your situation and plan your next steps. Update your resume and professional profiles, such as LinkedIn, highlighting your most recent achievements and skills. Begin networking with colleagues, mentors, and industry contacts who may be able to help you find new opportunities. Consider upskilling or learning new skills to improve your employability in a competitive market. Staying proactive and maintaining a positive outlook can help you recover and potentially turn the layoff into an opportunity for growth.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomePage",
  methods: {
    navigateToUsers() {
      this.$router.push("/users");
    },
  },
};
</script>

<style scoped>
.homepage {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80%;
  width: 100%;
}

.content-container {
  display: grid;
  grid-template-columns: 1fr auto 1fr; /* Two text areas on the sides and the image in the middle */
  align-items: center;
  gap: 40px; /* Space between the elements */
  max-width: 1200px;
  width: 100%;
  padding: 20px;
}

.paragraph {
  color: white;
  font-size: 16px;
  line-height: 1.6;
  text-align: justify;
  overflow-y: auto;
}

.left-paragraph h2,
.right-paragraph h2 {
  color: #646cff;
}

.image-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.circle-image {
  width: 250px;
  height: 250px;
  border-radius: 50%;
  border: 5px solid #646cff;
}

@media (max-width: 768px) {
  .content-container {
    grid-template-columns: 1fr; /* Stack paragraphs and image on small screens */
    text-align: center;
  }

  .circle-image {
    margin: 20px 0;
    width: 150px;
    height: 150px;
  }
}
</style>
