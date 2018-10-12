class ApplicationController < ActionController::Base
  def current_user
    @current_user ||= User.find(1)
  end
  helper_method :current_user
end
