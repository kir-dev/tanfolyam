require 'test_helper'

class ProfileControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get profile_index_url
    assert_response :success
  end

end
