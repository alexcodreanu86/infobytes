require 'spec_helper'

# rspec spec --format documentation

feature 'Image Creation' do
  context "with a logged in user" do 
    before :each do
      @user = User.create(first_name: "Han", last_name: "Solo", user_name: "tutorial_tester", email: "tutorial_tester@aliance.com", password: "password", password_confirmation: "password")
      @tutorial = @user.tutorials.create(title: "How to Be Matt", description: "A detailed tutorial on how to be the most gnarly land lubber of a freight train", rating: 3, subtopic_id: 2)
      @chapter = @tutorial.chapters.create(title: "blah", number: 1, tutorial_id: @tutorial.id)
      @sub_chapter = @chapter.sub_chapters.create(title: "subbie", chapter_id: @chapter.id)
      visit "/"    
      click_link "log in"

      fill_in 'user[email]', with: @user.email
      fill_in 'user[password]', with: "password"
      click_button "Sign in"
      visit "/sub_chapters/#{@sub_chapter.id}"
      click_link("image")
    end
  
    scenario "uploading an image persists an image in the databae" do
      expect{
        attach_file("image[image_path]", File.expand_path('spec/fixtures/files/test_image.jpg'))
        click_button "Create Image"
        }.to change(Image, :count).by(1) 
    end

    scenario "uploading an image redirects to a page with the image on it" do
      attach_file("image[image_path]", File.expand_path('spec/fixtures/files/test_image.jpg'))
      click_button "Create Image"
      page.find('img')['alt'].should have_content 'Test image'
    end

    xscenario "submitting Create Paragraph with no body does not create a new paragraph" do
      expect{
        click_button "Create Paragraph"
      }.to change(Paragraph, :count).by(0) 
    end

    xscenario "submitting Create Paragraph with no body gives error alert" do
      click_button "Create Paragraph"
      expect(page).to have_content("can't be blank")
    end

  end
end