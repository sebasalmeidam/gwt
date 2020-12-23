class ReportsController < ApplicationController
  before_action :authenticate_user!

  def dashboard
    @organization = current_user.organization_name
  end
end