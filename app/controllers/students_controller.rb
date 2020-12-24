class StudentsController < ApplicationController

  def validate_students
    @users = params[:users]
    @current_students = Student.where(torre_username: @users )
    
    # validates that student belong to organization
    #if !@current_students.empty?
    #  @current_students.update_all(organization: params[:organization])
    #end
    #@new_update = @current_students.where(name: "")
    
    @current_students = @current_students.map(&:torre_username)
    @students = @users - @current_students

    @new_students = @students.map{|user| {torre_username: user, organization: params[:organization], created_at: DateTime.now, updated_at: DateTime.now}}
    unless @new_students.empty?
      @new_students.in_groups_of(50, false) do |group|
        Student.insert_all(group)
      end
      system "rake get_users_genome USERNAMES=#{@students.join(',')} &"
      render json: {status: 200, message: 'Processing'} and return
    end

    # validate update users when endpoint call fail the first time
    #unless @new_update.empty?
    #  system "rake get_users_genome USERNAMES=#{@new_update.map(&:torre_username).join(',')} &"
    #  render json: {status: 200, message: 'Processing'} and return
    #end
    render json: {status: 200, message: 'Updated'} and return
  end
end